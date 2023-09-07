import { chromium } from 'playwright'
import { collectTableWithHeaders } from './collect-table'

async function main() {
  let browser = await chromium.launch({ headless: false })
  let page = await browser.newPage()
  await page.evaluate(() => {
    document.body.innerHTML = /* html */ `
<table id="demo">
  <tr>
    <th>id</th>
    <th>username</th>
  </tr>
  <tr>
    <td>1</td>
    <td>alice</td>
  </tr>
  <tr>
    <td>2</td>
    <td>bob</td>
  </tr>
</table>
`
  })
  let table = await collectTableWithHeaders({
    page,
    selector: 'table#demo',
  })
  console.log('table:', table)
  if (table) {
    await page.close()
    await browser.close()
  }
}
main().catch(e => console.error(e))
