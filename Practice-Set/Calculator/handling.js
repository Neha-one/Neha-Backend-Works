const calculationHandler = require('./calculation')
const reqestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url.toLowerCase() === "/") {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head>
          <title>Calculator</title>
        </head>
        <body>
        <h1>Welcome to Calculator</h1>
        <a href="/calculator">Open Calculator</a>
        </body>
      </html>`);
    return res.end();
  }


  else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
<head>
  <title>Calculator</title>
</head>
<body>
  <form action="/calculator-result" method="POST">
      <input  type="number" placeholder="enter 1st number"  name="number1"/>
  <input type="number" placeholder="enter 2nd number" name="number2"/>
  <button type="submit">Sum</button>
  </form>
</body>
</html>`);
    return res.end();
  }
  else if (req.url.toLowerCase() === '/calculator-result' && req.method === "POST") {
    return calculationHandler(req, res)
  }
  res.setHeader('Content-Type', 'text/html');
  res.write(`
      <html>
        <head>
          <title>Calculator</title>
        </head>
        <body>
        <h1>404 Page Not Found</h1>
        <a href="/">Go to Home</a>
        </body>
      </html>`);
  return res.end();

};
module.exports = reqestHandler;