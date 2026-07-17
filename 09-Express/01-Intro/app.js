//Core Module
const http = require('http');

//External Module
const express = require('express');

//Local Module
const userRequestHandler = require('./user');

//calling express.
const app = express();

//create server via express
const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})