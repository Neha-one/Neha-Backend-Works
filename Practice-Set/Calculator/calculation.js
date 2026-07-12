const calculationHandler = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    // console.log(chunk)
    body.push(chunk);
  });
  req.on("end", () => {
    const fullbody = Buffer.concat(body).toString();
    // console.log(fullbody)
    const params = new URLSearchParams(fullbody);
    const Objectbody = Object.fromEntries(params);
    // res.write(`<h2>${number1 + number2}</h2>`)
    let answer = Number(Objectbody.number1) + Number(Objectbody.number2);
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
<head>
  <title>Navbar</title>
</head>
<body>
    <h1>Answer: ${answer}</h1>
</body>
</html>`);
  return res.end();
  });
};
module.exports = calculationHandler;
