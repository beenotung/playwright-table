import { Page } from 'playwright'

export async function collectTableWithHeaders<
  Key extends string = string,
>(input: {
  page: Page
  selector: string
}): Promise<Record<Key, string>[] | undefined> {
  let tables = await collectAllTableWithHeaders({ ...input, limit: 1 })
  return tables[0]
}

export async function collectTableWithoutHeaders(input: {
  page: Page
  selector: string
}): Promise<string[][] | undefined> {
  let tables = await collectAllTableWithoutHeaders({ ...input, limit: 1 })
  return tables[0]
}

export function collectAllTableWithHeaders<Key extends string = string>(input: {
  page: Page
  selector: string
  limit?: number
}): Promise<Array<Record<Key, string>[]>> {
  return input.page.evaluate(
    input => {
      let tables = document.querySelectorAll<HTMLTableElement>(input.selector)
      let result: Array<Array<Record<Key, string>>> = []

      for (let table of tables) {
        let headers: Key[] = Array.from(
          table.tHead?.rows[0].cells || [],
          cell => cell.innerText as Key,
        )
        if (headers.length === 0) continue
        let dicts: Record<Key, string>[] = []
        for (let tBody of table.tBodies) {
          row: for (let row of tBody.rows) {
            let dict = {} as Record<Key, string>
            for (let i = 0; i < headers.length; i++) {
              let header = headers[i]
              let cell = row.cells[i]
              if (cell.tagName === 'TH') continue row
              dict[header] = cell.innerText
            }
            dicts.push(dict)
          }
        }
        result.push(dicts)
        if (input.limit && result.length >= input.limit) break
      }

      return result
    },
    { selector: input.selector, limit: input.limit },
  )
}

export function collectAllTableWithoutHeaders(input: {
  page: Page
  selector: string
  limit?: number
}): Promise<Array<string[][]>> {
  return input.page.evaluate(
    input => {
      let tables = document.querySelectorAll<HTMLTableElement>(input.selector)
      let result: Array<Array<Array<string>>> = []

      for (let table of tables) {
        let rows: Array<Array<string>> = []
        for (let tBody of table.tBodies) {
          row: for (let row of tBody.rows) {
            let cells: Array<string> = []
            for (let i = 0; i < row.cells.length; i++) {
              let cell = row.cells[i]
              if (cell.tagName === 'TH') continue row
              cells.push(cell.innerText)
            }
            rows.push(cells)
          }
        }
        result.push(rows)
        if (input.limit && result.length >= input.limit) break
      }

      return result
    },
    { selector: input.selector, limit: input.limit },
  )
}
