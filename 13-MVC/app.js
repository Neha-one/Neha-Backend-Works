//Core module
const path = require('path')

//External module
const express = require('express')

//local module:
const userRouter = require('./routes/userRouter')
const { hostRouter } = require('./routes/hostRouter')
const bodyParser = require('body-parser')
const rootDir = require('./utils/path')
const errorController = require('./controllers/errors')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded());
// app.use(express.static("public"))
app.use(express.static(path.join(rootDir, 'public')))
app.use(userRouter);
app.use("/host", hostRouter);

// error handling 404------
app.use(errorController.pageNotFound)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`)
})