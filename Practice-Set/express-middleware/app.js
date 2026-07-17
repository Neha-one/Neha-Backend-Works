const express = require('express');
const app = express();


app.use((req, res, next) => {
  console.log("URL: ", req.url)
  next();
})

app.use((req, res, next) => {
  console.log("METHOD: ", req.method)
  next();
})

app.get("/", (req, res) => {
  console.log('this is 3rd middleware');
  res.send(`
    <h2>click on Go on Contact to contact us</h2>
    <a a href = "/contact-us" >Go on Contact</a >`)
})

app.get("/contact-us", (req, res, next) => {
  console.log('sending form');
  res.send(`
    <h2>please enter your details</h2>
      <form action="/contact-us" method="POST">
      <input  type="text" placeholder="enter name"  name="name"/>
  <input type="email" placeholder="enter email" name="email"/>
  <button type="submit">Submit</button>
  </form>
`)
})
app.post("/contact-us", (req, res, next) => {
  res.send('we wil contact you shortly');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`)
});