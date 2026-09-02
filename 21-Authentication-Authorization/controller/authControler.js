const express = require('express');

exports.getLogin = (req, res) => {
  res.render('auth/login', { pageTitle: "Login", currentPage: "login", isLoggedIn: false })
}



exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  res.redirect("/");
}



exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}