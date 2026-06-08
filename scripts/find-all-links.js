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

  // Use a simple regex to find all <a href="..."> links in the body
  const regex = /<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g
  let match
  let count = 0
  while ((match = regex.exec(content)) !== null) {
    const href = match[1]
    const body = match[2]
    // Clean up body HTML/text
    const text = body.replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ')
    // Only print if the link is a page route or has interesting text
    if (href.startsWith('/') || href.startsWith('.') || href.indexOf('competence') !== -1) {
      console.log(`  - Href: "${href}" | Text: "${text}"`)
      count++
    }
  }
  console.log(`Total relevant links: ${count}`)
})
