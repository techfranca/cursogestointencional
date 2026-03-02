import { google, type sheets_v4 } from "googleapis"
import { NextResponse } from "next/server"

const USER_SHEET_TITLE = "Usuários"
const QUESTIONNAIRE_SHEET_TITLE = "Questionário Casamento"
const DEFAULT_PROGRESS = Array(15).fill(false)
const USER_HEADERS = [
  "Telefone",
  "Nome",
  "Progresso",
  "Resumo Progresso",
  "Data Login",
  "Última Atualização",
]
const QUESTIONNAIRE_HEADERS = [
  "Data de resposta",
  "Nome",
  "Telefone",
  "Q01",
  "Q02",
  "Q03",
  "Q04",
  "Q05",
  "Q06",
  "Q07",
  "Q08",
  "Q09",
  "Pontuação Total",
  "Classificação",
]

type SheetsRequestBody = {
  action?: "login" | "saveProgress" | "questionnaire"
  nome?: string
  telefone?: string
  progresso?: boolean[]
  answers?: (number | null)[]
}

type ApiSuccess = {
  success: true
  [key: string]: unknown
}

export const runtime = "nodejs"

function getBrazilTimestamp() {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())
}

function buildProgressSummary(progress: boolean[]) {
  const completedDays = progress
    .map((done, index) => (done ? String(index + 1).padStart(2, "0") : null))
    .filter((value): value is string => Boolean(value))

  if (completedDays.length === 0) {
    return "0/15 dias | nenhum dia concluido"
  }

  return `${completedDays.length}/15 dias | ${completedDays.join(", ")}`
}

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Variavel de ambiente ausente: ${name}`)
  }

  return value
}

function getSheetsClient() {
  const clientEmail = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL")
  const privateKey = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n")

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

function getSpreadsheetId() {
  return getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID")
}

function ensureAppendWorked(
  action: SheetsRequestBody["action"],
  result: sheets_v4.Schema$AppendValuesResponse | undefined
) {
  const updatedRows = result?.updates?.updatedRows || 0
  const updatedRange = result?.updates?.updatedRange || null

  if (updatedRows < 1 || !updatedRange) {
    throw new Error(`A API do Google nao confirmou append para ${action}.`)
  }

  console.info("Google Sheets append confirmado:", {
    action,
    updatedRows,
    updatedRange,
    tableRange: result?.tableRange || null,
  })
}

function ensureBatchUpdateWorked(
  action: SheetsRequestBody["action"],
  result: sheets_v4.Schema$BatchUpdateValuesResponse | undefined
) {
  const totalUpdatedCells = result?.totalUpdatedCells || 0

  if (totalUpdatedCells < 1) {
    throw new Error(`A API do Google nao confirmou update para ${action}.`)
  }

  console.info("Google Sheets update confirmado:", {
    action,
    totalUpdatedCells,
    totalUpdatedRows: result?.totalUpdatedRows || 0,
    totalUpdatedSheets: result?.totalUpdatedSheets || 0,
  })
}

async function ensureSheetExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  title: string
) {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
  const existingSheet = spreadsheet.data.sheets?.find((sheet) => sheet.properties?.title === title)

  if (existingSheet?.properties?.sheetId !== undefined) {
    return existingSheet.properties.sheetId
  }

  const createResponse = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title } } }],
    },
  })

  const createdSheet = createResponse.data.replies?.[0]?.addSheet?.properties

  if (createdSheet?.sheetId === undefined) {
    throw new Error(`Nao foi possivel criar a aba ${title}.`)
  }

  return createdSheet.sheetId
}

async function getSheetId(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  title: string
) {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
  const sheet = spreadsheet.data.sheets?.find((item) => item.properties?.title === title)
  const sheetId = sheet?.properties?.sheetId

  if (sheetId === undefined) {
    throw new Error(`Nao foi possivel localizar a aba ${title}.`)
  }

  return sheetId
}

async function ensureHeaderRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  title: string,
  headers: string[]
) {
  const headerRange = `'${title}'!1:1`
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  })

  const firstRow = existing.data.values?.[0]

  if (firstRow && firstRow.length > 0) {
    return
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${title}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [headers],
    },
  })
}

async function rewriteHeaderRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  title: string,
  headers: string[]
) {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${title}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [headers],
    },
  })
}

async function formatDateColumns(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetTitle: string,
  startColumnIndex: number,
  endColumnIndex: number
) {
  const sheetId = await getSheetId(sheets, spreadsheetId, sheetTitle)

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 1,
              startColumnIndex,
              endColumnIndex,
            },
            cell: {
              userEnteredFormat: {
                numberFormat: {
                  type: "DATE_TIME",
                  pattern: "dd/MM/yyyy HH:mm:ss",
                },
              },
            },
            fields: "userEnteredFormat.numberFormat",
          },
        },
      ],
    },
  })
}

async function ensureUsersSheet(sheets: sheets_v4.Sheets, spreadsheetId: string) {
  await ensureSheetExists(sheets, spreadsheetId, USER_SHEET_TITLE)

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${USER_SHEET_TITLE}'!1:1`,
  })
  const firstRow = existing.data.values?.[0] || []

  if (
    firstRow[0] === "Telefone" &&
    firstRow[1] === "Nome" &&
    firstRow[2] === "Progresso" &&
    firstRow[3] === "Data Login"
  ) {
    const sheetId = await getSheetId(sheets, spreadsheetId, USER_SHEET_TITLE)

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId,
                dimension: "COLUMNS",
                startIndex: 3,
                endIndex: 4,
              },
              inheritFromBefore: true,
            },
          },
        ],
      },
    })
  }

  await ensureHeaderRow(sheets, spreadsheetId, USER_SHEET_TITLE, USER_HEADERS)
  await rewriteHeaderRow(sheets, spreadsheetId, USER_SHEET_TITLE, USER_HEADERS)
  await formatDateColumns(sheets, spreadsheetId, USER_SHEET_TITLE, 4, 6)
}

async function ensureQuestionnaireSheet(sheets: sheets_v4.Sheets, spreadsheetId: string) {
  await ensureSheetExists(sheets, spreadsheetId, QUESTIONNAIRE_SHEET_TITLE)
  await ensureHeaderRow(sheets, spreadsheetId, QUESTIONNAIRE_SHEET_TITLE, QUESTIONNAIRE_HEADERS)
  await rewriteHeaderRow(sheets, spreadsheetId, QUESTIONNAIRE_SHEET_TITLE, QUESTIONNAIRE_HEADERS)
  await formatDateColumns(sheets, spreadsheetId, QUESTIONNAIRE_SHEET_TITLE, 0, 1)
}

async function getUserRows(sheets: sheets_v4.Sheets, spreadsheetId: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${USER_SHEET_TITLE}'!A:F`,
  })

  return response.data.values || []
}

function parseProgress(rawValue: string | undefined) {
  if (!rawValue) {
    return [...DEFAULT_PROGRESS]
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown

    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "boolean")) {
      return parsed
    }
  } catch {
    return [...DEFAULT_PROGRESS]
  }

  return [...DEFAULT_PROGRESS]
}

function normalizeText(value: string | undefined) {
  return (value || "").trim().toLocaleLowerCase("pt-BR")
}

function normalizePhone(value: string | undefined) {
  return (value || "").replace(/\D/g, "")
}

function findUserByPhone(rows: string[][], telefone: string) {
  const normalizedPhone = normalizePhone(telefone)

  return rows.findIndex((row, index) => {
    return index > 0 && normalizePhone(row[0]) === normalizedPhone
  })
}

async function handleLogin(sheets: sheets_v4.Sheets, spreadsheetId: string, data: SheetsRequestBody) {
  const telefone = data.telefone?.trim()
  const nome = data.nome?.trim()

  if (!telefone || !nome) {
    throw new Error("Nome e telefone sao obrigatorios para login.")
  }

  await ensureUsersSheet(sheets, spreadsheetId)
  const rows = await getUserRows(sheets, spreadsheetId)
  const rowIndex = findUserByPhone(rows, telefone)

  if (rowIndex >= 0) {
    const row = rows[rowIndex]
    const rowName = (row[1] || "").trim()
    const sameName = normalizeText(rowName) === normalizeText(nome)

    if (!sameName) {
      throw new Error(
        "Esse telefone ja foi usado com outro nome. Para entrar, use exatamente o mesmo nome informado na primeira vez."
      )
    }

    const progresso = parseProgress(row[2])
    const progressSummary = buildProgressSummary(progresso)

    const updateResponse = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: `'${USER_SHEET_TITLE}'!D${rowIndex + 1}`,
            values: [[progressSummary]],
          },
          {
            range: `'${USER_SHEET_TITLE}'!F${rowIndex + 1}`,
            values: [[getBrazilTimestamp()]],
          },
        ],
      },
    })
    ensureBatchUpdateWorked("login", updateResponse.data)

    const response: ApiSuccess = {
      success: true,
      exists: true,
      nome: row[1] || nome,
      progresso,
    }

    return response
  }

  const appendResponse = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${USER_SHEET_TITLE}'!A:F`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        telefone,
        nome,
        JSON.stringify(DEFAULT_PROGRESS),
        buildProgressSummary(DEFAULT_PROGRESS),
        getBrazilTimestamp(),
        getBrazilTimestamp(),
      ]],
    },
  })
  ensureAppendWorked("login", appendResponse.data)

  const response: ApiSuccess = {
    success: true,
    exists: false,
    nome,
    progresso: [...DEFAULT_PROGRESS],
  }

  return response
}

async function handleSaveProgress(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  data: SheetsRequestBody
) {
  const telefone = data.telefone?.trim()
  const progresso = data.progresso

  if (!telefone || !Array.isArray(progresso)) {
    throw new Error("Telefone e progresso sao obrigatorios.")
  }

  await ensureUsersSheet(sheets, spreadsheetId)
  const rows = await getUserRows(sheets, spreadsheetId)
  const rowIndex = findUserByPhone(rows, telefone)

  if (rowIndex < 0) {
    throw new Error("Usuario nao encontrado para salvar progresso.")
  }

  const updateResponse = await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data: [
        {
          range: `'${USER_SHEET_TITLE}'!C${rowIndex + 1}`,
          values: [[JSON.stringify(progresso)]],
        },
        {
          range: `'${USER_SHEET_TITLE}'!D${rowIndex + 1}`,
          values: [[buildProgressSummary(progresso)]],
        },
        {
          range: `'${USER_SHEET_TITLE}'!F${rowIndex + 1}`,
          values: [[getBrazilTimestamp()]],
        },
      ],
    },
  })
  ensureBatchUpdateWorked("saveProgress", updateResponse.data)

  const response: ApiSuccess = { success: true }
  return response
}

async function handleQuestionnaire(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  data: SheetsRequestBody
) {
  const nome = data.nome?.trim()
  const telefone = data.telefone?.trim()
  const answers = data.answers

  if (!nome || !telefone || !Array.isArray(answers)) {
    throw new Error("Nome, telefone e respostas sao obrigatorios.")
  }

  await ensureQuestionnaireSheet(sheets, spreadsheetId)

  const total = answers.reduce((sum, answer) => sum + (answer ?? 0), 0)
  const classification = total <= 22 ? "Atenção" : total <= 35 ? "Base sólida" : "Vínculo forte"

  const appendResponse = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${QUESTIONNAIRE_SHEET_TITLE}'!A:N`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[getBrazilTimestamp(), nome, telefone, ...answers, total, classification]],
    },
  })
  ensureAppendWorked("questionnaire", appendResponse.data)

  const response: ApiSuccess = { success: true }
  return response
}

export async function POST(request: Request) {
  let body: SheetsRequestBody

  try {
    body = (await request.json()) as SheetsRequestBody
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalido." }, { status: 400 })
  }

  if (!body.action) {
    return NextResponse.json({ ok: false, error: "Acao obrigatoria." }, { status: 400 })
  }

  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    console.info("Sheets request iniciada:", {
      action: body.action,
      spreadsheetIdSuffix: spreadsheetId.slice(-6),
    })

    let data: ApiSuccess

    if (body.action === "login") {
      data = await handleLogin(sheets, spreadsheetId, body)
    } else if (body.action === "saveProgress") {
      data = await handleSaveProgress(sheets, spreadsheetId, body)
    } else if (body.action === "questionnaire") {
      data = await handleQuestionnaire(sheets, spreadsheetId, body)
    } else {
      return NextResponse.json({ ok: false, error: "Acao invalida." }, { status: 400 })
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado."
    console.error("Erro em /api/sheets:", { action: body.action, message })

    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
