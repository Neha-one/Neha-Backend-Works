const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', "text/html")
  res.write('<html>')
  res.write('<head><title>backend development</title></head>')
  res.write('<body>')
  if (req.url.toLowerCase() === '/') {
    res.write('<ul>')
    res.write('<li><a href="/">home<a/></li>')
    res.write('<li><a href="/women">women<a/></li>')
    res.write('<li><a href="/men">men<a/></li>')
    res.write('<li><a href="/kids">kids<a/></li>')
    res.write('<li><a href="/cart">cart<a/></li>')
    res.write('</ul>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/home') {
    res.write('<h1>welcom to HOME</h1>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/women') {
    res.write('<h1>hey i am a womnan</h1>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/men') {
    res.write('<h1>hey i am man</h1>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/kids') {
    res.write('<h1>hey this is kids section</h1>')
    return res.end();
  }
  else if (req.url.toLowerCase() === '/cart') {
    res.write('<h1>hey this is cart section</h1>')
    return res.end();
  }
  res.write('<body>')
  res.write('</html>')
})

const PORT = 3000;
server.listen(PORT, (req, res) => {
  console.log(`Server is running on address http://localhost:${PORT}`);
})