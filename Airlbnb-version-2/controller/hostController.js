const express = require('express');
const Home = require('../model/home');

exports.getAddHome = (req, res) => {
  res.render("host/add-home", { pageTitle: "add-home" });
}

exports.postAddHome = (req, res) => {
  const { imageURL,
    homeName,
    homePrice,
    location,
    rating
  } = req.body;
  const home = new Home(
    req.body.imageURL,
    req.body.homeName,
    req.body.homePrice,
    req.body.location,
    req.body.rating
  );

  home.save();
  res.redirect('/home')
}

exports.getHostHome = (req, res) => {
  Home.fetchAll(addedHome => {
    res.render("host/host-home", { addedHome: addedHome, pageTitle: "host-home" });    
  })
}