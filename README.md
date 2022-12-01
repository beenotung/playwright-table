# playwright-table

Collect tabular data from HTML Table Elements as object array or 2D string array

[![npm Package Version](https://img.shields.io/npm/v/playwright-table)](https://www.npmjs.com/package/playwright-table)

## Installation

```bash
npm install playwright-table
```

## Typescript Signature

```typescript
export function collectTableWithHeaders<Key extends string = string>(input: {
  page: Page
  selector: string
}): Promise<Record<Key, string>[] | undefined>

export function collectTableWithoutHeaders(input: {
  page: Page
  selector: string
}): Promise<string[][] | undefined>

export function collectAllTableWithHeaders<Key extends string = string>(input: {
  page: Page
  selector: string
  limit?: number
}): Promise<Array<Record<Key, string>[]>>

export function collectAllTableWithoutHeaders(input: {
  page: Page
  selector: string
  limit?: number
}): Promise<Array<string[][]>>
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
