import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pagesDir = path.join(root, 'public', 'pages')
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))

files.forEach(file => {
  const filePath = path.join(pagesDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  console.log(`\n========================================`)
  console.log(`Page: ${file}`)
  console.log(`========================================`)

  let startIdx = 0
  while (true) {
    startIdx = content.indexOf('<header', startIdx)
    if (startIdx === -1) break
    const endIdx = content.indexOf('</header>', startIdx)
    if (endIdx === -1) break
    
    const headerBlock = content.substring(startIdx, endIdx + 9)
    console.log(`  Header at index ${startIdx}:`)
    
    let linkIdx = 0
    while (true) {
      linkIdx = headerBlock.indexOf('<a', linkIdx)
      if (linkIdx === -1) break
      const endLinkIdx = headerBlock.indexOf('</a>', linkIdx)
      if (endLinkIdx !== -1) {
        const linkTag = headerBlock.substring(linkIdx, endLinkIdx + 4)
        const textMatch = linkTag.match(/>([^<]*)</)
        const text = textMatch ? textMatch[1].trim() : '(html)'
        const hrefMatch = linkTag.match(/href="([^"]*)"/)
        const href = hrefMatch ? hrefMatch[1] : 'none'
        console.log(`    - Link text: "${text}" | href: "${href}"`)
      }
      linkIdx += 2
    }
    startIdx = endIdx + 9
  }
})
