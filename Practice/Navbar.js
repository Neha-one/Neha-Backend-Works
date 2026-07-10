const http = require("http");
const fs = require("fs");
// const style = require('Navbar');

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  if (req.url.toLowerCase() === "/home") {
    res.write("<h1>welcom to HOME</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/women") {
    res.write("<h1>hey i am a womnan</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/men") {
    res.write("<h1>hey i am man</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/kids") {
    res.write("<h1>hey this is kids section</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/cart") {
    res.write("<h1>hey this is cart section</h1>");
    return res.end();
  }

  res.write(`
    <html>
<head>
  <title>Navbar</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/men">Men</a></li>
      <li><a href="/kids">Kids</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
  </nav>
</body>
</html >
  `);
  res.end();

});

const PORT = 3000;
server.listen(PORT, (req, res) => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});
