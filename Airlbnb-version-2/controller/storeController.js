const express = require('express');
const Home = require('../model/home');

exports.getIndex = (req, res) => {
  Home.fetchAll(addedHome => {
    res.render("store/index", { addedHome: addedHome, pageTitle: "index" });

  })
}
exports.getHome = (req, res) => {
  Home.fetchAll((addedHome) => {
    res.render("store/home", { addedHome: addedHome, pageTitle: "home" });
  })
}
exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, house => {
    if (!house) {
      console.log("house not found");
      res.redirect("/home");
    }
    else {
      res.render("store/home-details", { house: house, pageTitle: "Home Details" });
    }
  });
};

exports.getBooking = (req, res) => {
  res.render("store/booking", { pageTitle: "booking" });
}
exports.getFavorite = (req, res) => {
  res.render("store/booking", { pageTitle: "booking" });
}

exports.postAddFavorite = (req, res) => {
  const FavId = req.body;
  console.log(FavId);
  res.redirect("/favorite");
}