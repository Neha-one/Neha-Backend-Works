const http = require('http');

// function RequestListner(req, res) {
//   console.log(req)
// };
// const server= http.createServer(RequestListner);

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();
  
})

const PORT = 3000;

server.listen(PORT, () => {
  // console.log("server running on address http://localhost:", PORT)
  // or
  console.log(`Server running on address http://localhost:${PORT}`)
})