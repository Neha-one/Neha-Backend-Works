const express = require('express');

exports.getIndex = (req, res) => {
  res.render("store/index", { pageTitle : "index"});
}
exports.getHome = (req, res) => {
  res.render("store/home", { pageTitle : "home"});
}
exports.getBooking = (req, res) => {
  res.render("store/booking", { pageTitle : "booking"});
}
exports.getFavorite = (req, res) => {
  res.render("store/favorite", { pageTitle : "favorite"});
}
