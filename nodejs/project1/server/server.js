const http = require('http')
const host = 'http://localhost'
const port = 3000
const stats = require('../src/index')

const server = http.createServer((req, res) => {
  let url = req.url

  if (url === '/stats') {
    res.end(JSON.stringify(stats, null, 2))
  } else {
    res.end(`<h1> Welcome to Node Server</h1>`)
  }
})

server.listen(port, () =>
  console.log(`Server is running on ${host}:${port}, ${stats}`)
)
