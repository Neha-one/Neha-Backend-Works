const http = require('http');
const reqestHandler= require('./handling');

const server = http.createServer(reqestHandler)

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`)
})