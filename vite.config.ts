import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Map URL paths → local Framer HTML files
const ROUTES: Record<string, string> = {
  '/':         'public/pages/index.html',
  '/about':    'public/pages/about.html',
  '/services': 'public/pages/services.html',
  '/contact':  'public/pages/contact.html',
  '/terms':    'public/pages/terms.html',
  '/404':      'public/pages/404.html',
}

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    {
      name: 'framer-page-router',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url ?? '/').split('?')[0].split('#')[0]
          const filePath = ROUTES[url]

          // Exact route match → serve the Framer HTML page
          if (filePath) {
            const abs = path.resolve(filePath)
            if (fs.existsSync(abs)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(fs.readFileSync(abs, 'utf-8'))
              return
            }
          }

          // Unknown page route → serve 404
          const isAsset = url.includes('.') || url.startsWith('/framer-chunks') || url.startsWith('/pages')
          if (!isAsset) {
            const notFound = path.resolve('public/pages/404.html')
            if (fs.existsSync(notFound)) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(fs.readFileSync(notFound, 'utf-8'))
              return
            }
          }

          next()
        })
      },
    },
  ],
})
