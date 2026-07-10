const fs = require('fs');

const userRequestHandler = (req, res) => {
  
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

      const params = new URLSearchParams(fullbody);

      //--------------method 01----------------
      // const bodyObject = {};
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }
      // console.log(bodyObject);

      //--------------method 02----------------
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    })


    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.write('<html>')
  res.write('<head><title>Backend development</title></head>')
  res.write('<body><h1>other pages........</h1></body>')
  res.write('</html>')
  res.end();
}

module.exports = userRequestHandler;