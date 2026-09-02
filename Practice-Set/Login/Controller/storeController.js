const express = require('express')
exports.getHome = (req, res) => {
  console.log(req.session, req.session.isLoggedIn);
  res.render("home", { isLoggedIn: req.isLoggedIn });
}