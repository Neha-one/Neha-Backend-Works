const express = require('express');
const authRouter = express.Router();
const authControler = require("../controller/authControler");

authRouter.get("/login", authControler.getLogin);
authRouter.post("/login", authControler.postLogin);
authRouter.post("/logout", authControler.postLogout);
authRouter.get("/signup", authControler.getSignup);
authRouter.post("/signup", authControler.postsignup);

module.exports = { authRouter };