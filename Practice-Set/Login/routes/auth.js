const express = require('express')

const AuthRouter = express.Router();
const authController=require('../Controller/authController')
AuthRouter.get("/login", authController.getLogin);
AuthRouter.post("/login", authController.postLogin);
AuthRouter.post("/logout", authController.postLogout);

module.exports = {AuthRouter};