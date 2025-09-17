import citizens from './ring/citizens.json' with { type: "json" }
import * as fs from 'node:fs/promises'

// replace MAGIC REPLACE with citizens
const replace = '<!-- MAGIC REPLACE -->'

let rows = ''

for (let citizen of citizens) {
    rows += `<tr><td>${citizen.user.trim()}</td><td><a href="${citizen.url.trim()}">${citizen.url.trim()}</a></td></tr>`
}

let handle = await fs.open('./src/index.html')
let file = await handle.readFile('utf-8')
await handle.close()

let result = file.replace(replace, rows)

// replace COUNT with number of citizens
const countReplace = '<!-- COUNT -->'
result = result.replace(countReplace, citizens.length)

await fs.writeFile('./static/index.html', result)
