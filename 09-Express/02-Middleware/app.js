const express = require('express');
 
const app = express();

//Middleware
app.use((req, res, next) => {
  console.log('this is first middleware')
res.send('<p>Welcome to Middleware practice</p>')
  next();
})
app.use((req, res, next) => {
  console.log('this is second middleware')

  // next();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})