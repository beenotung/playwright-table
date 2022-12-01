import { firefox } from 'playwright'
import { collectTableWithHeaders } from '../collect-table'

async function main() {
  let browser = await firefox.launch({ headless: false })
  let page = await browser.newPage()
  await page.goto(
    'https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_A',
  )
  await page.waitForSelector('.wikitable')
  let rows = await collectTableWithHeaders({
    page,
    selector: '.wikitable',
  })
  console.log(rows)
  await page.close()
  await browser.close()
}
main().catch(e => console.error(e))
