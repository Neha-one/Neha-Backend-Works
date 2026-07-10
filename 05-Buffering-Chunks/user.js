const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader('Content-Type', "text/html")

  if (req.url === '/') {
    res.write('<html>')
    res.write('<head><title>Backend development</title></head>')
    res.write('<body>')
    res.write('<h1> Enter your details:</h1>')
    res.write('<form action="/user-details" method="POST">')
    res.write('<input type="text" name="username" placeholder="Enter your name"/><br>')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" name="gender" id="female" value="female"/>')
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" name="gender" id="male" value="male"/>')
    res.write('<br><button type="submit">submit</button>')
    res.write('</form>')
    res.write('</body > ')
    res.write('</html>')
    return res.end();
  }

  else if (req.url.toLowerCase() === "/user-details" && req.method === "POST") {

    const body = [];
    req.on('data', chunk => {
      console.log(chunk)
      body.push(chunk);
    })
    req.on('end', () => {
      const fullbody = Buffer.concat(body).toString();
      console.log(fullbody);
      //-------- username=neha+kumari&gender=female -----------
    })

    fs.writeFileSync("user.txt", "Neha Kumari Baranwal");
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.write('<html>')
  res.write('<head><title>Backend development</title></head>')
  res.write('<body><h1>other pages........</h1></body>')
  res.write('</html>')
  res.end();
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})                              