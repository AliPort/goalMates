import http from 'http'
import db from './db'
import { initModels } from './models'

async function run() {
  initModels(db)
  const hostname = process.env.HOSTNAME || '127.0.0.1'
  const port = parseInt(process.env.PORT || '3000')
  
  const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
  })
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
}

run()