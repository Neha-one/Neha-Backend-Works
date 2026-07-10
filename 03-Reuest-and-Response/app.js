const http = require('http')

const server = http.createServer((req, res) => {

  // console.log(req.url, req.method, req.headers);

  res.setHeader('Content-Type', "text/html")

  res.write('<html>')
  res.write('<head><title>Backend development</title></head>')

  if (req.url === '/') {
    res.write('<body><h1>Welcome to Home</h1></body>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/about') {
    res.write('<body><h1>Hey i am Neha and i am learnign backend</h1></body>')
    return res.end();
  }
  res.write('<body><h1>other pages........</h1></body>')
  res.write('</html>')
  res.end();

  // -----------MY------TRY--------------AND IT'S WORKING-----------
  //   res.setHeader('Content-Type', "text/html");
  //   res.write('<html><head><title>web</title></head><body><h1>Hey Neha</h1></body></html>')
  //   res.end();
})
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})