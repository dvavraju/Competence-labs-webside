/**
 * Production build script.
 *
 * Copies the Framer pages and local chunk files into dist/ so they can be
 * served by any static web server.  The HTML files already have their CDN
 * chunk URLs rewritten to /framer-chunks/, so the paths remain valid as long
 * as the dist/ tree keeps the same layout.
 *
 * Output layout:
 *   dist/
 *     index.html          ← home page at /
 *     about/index.html    ← /about
 *     services/index.html ← /services
 *     contact/index.html  ← /contact
 *     terms/index.html    ← /terms
 *     404.html            ← catch-all 404
 *     framer-chunks/      ← all JS chunks
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const distDir   = path.join(root, 'dist')

// ── helpers ──────────────────────────────────────────────────────────────────

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest))
  fs.copyFileSync(src, dest)
  console.log(`  ✔ ${path.relative(root, dest)}`)
}

function copyDir(srcDir, destDir) {
  mkdirp(destDir)
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath  = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFile(srcPath, destPath)
    }
  }
}

// ── pages map ─────────────────────────────────────────────────────────────────

const PAGES = [
  { src: 'public/pages/index.html',    dest: 'dist/index.html'           },
  { src: 'public/pages/about.html',    dest: 'dist/about/index.html'     },
  { src: 'public/pages/services.html', dest: 'dist/services/index.html'  },
  { src: 'public/pages/contact.html',  dest: 'dist/contact/index.html'   },
  { src: 'public/pages/terms.html',    dest: 'dist/terms/index.html'     },
  { src: 'public/pages/404.html',      dest: 'dist/404.html'             },
]

// ── build ─────────────────────────────────────────────────────────────────────

console.log('\n🔨  Building Competence Labs → dist/\n')

// Clean dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
  console.log('  🧹 Cleaned dist/')
}
mkdirp(distDir)

// Copy pages
console.log('\n📄  Pages:')
for (const { src, dest } of PAGES) {
  const srcAbs  = path.join(root, src)
  const destAbs = path.join(root, dest)
  if (!fs.existsSync(srcAbs)) {
    console.warn(`  ⚠  Missing: ${src}`)
    continue
  }
  copyFile(srcAbs, destAbs)
}

// Copy framer chunks
console.log('\n📦  Framer chunks:')
const chunksDir     = path.join(root, 'public', 'framer-chunks')
const chunksDestDir = path.join(distDir, 'framer-chunks')
if (fs.existsSync(chunksDir)) {
  copyDir(chunksDir, chunksDestDir)
} else {
  console.warn('  ⚠  public/framer-chunks/ not found')
}

console.log('\n✅  Build complete!\n')
console.log('   Serve with:  npx serve dist  (or any static server)')
console.log('   The /framer-chunks/ path must be reachable relative to the site root.\n')
