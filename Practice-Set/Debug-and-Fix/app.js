const http = require('http')
const calculateArea = require('./calculation')

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  calculateArea();
  res.end();
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is running on address http://localhost${PORT}`)
}) 