const express = require('express');

exports.getLogin = (req, res) => {
  res.render('login', { isLoggedIn: false });
}
exports.postLogin = (req, res) => {
  console.log(req.body);
  req.session.isLoggedIn= true;
  res.redirect('/');
}
exports.postLogout = (req, res) => {
  res.cookie("isLoggedIn", false);
  res.redirect('/login');
}
