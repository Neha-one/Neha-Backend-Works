const express = require('express');
const Home = require('../model/home');
const User = require('../model/user')

exports.getIndex = (req, res) => {

  Home.find().then(addedHome => {
    res.render("store/index", { addedHome: addedHome, pageTitle: "index", currentPage: "index", isLoggedIn: req.isLoggedIn });
  })
}
exports.getHome = (req, res) => {
  Home.find().then(addedHome => {
    res.render("store/home", { addedHome: addedHome, pageTitle: "home", currentPage: "home", isLoggedIn: req.isLoggedIn });
  })
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(house => {
    if (!house) {
      res.redirect("/home");
    }
    else {
      console.log(house);

      res.render("store/home-details", { house: house, pageTitle: "Home Details", currentPage: "Home Details", isLoggedIn: req.isLoggedIn });
    }
  }).catch((error) => {
    console.log("Error while showing details", error);
  })
};

exports.getBooking = (req, res) => {
  res.render("store/booking", { pageTitle: "booking", currentPage: "booking", isLoggedIn: req.isLoggedIn });
}


exports.getFavourite = async (req, res) => {
  //userId = kis user ne favourite kiya
  const userId = req.session.user._id;
  //favourites = user ke favourite Home IDs,populate() = IDs ko actual Home documents mein convert karke deta hai.
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favorite", { Favourites: user.favourites, pageTitle: "Favourite", currentPage: "Favourite", isLoggedIn: req.isLoggedIn });
}


exports.postAddFavourite = async (req, res) => {

  const userId = req.session.user._id;
  const user = await User.findById(userId);
  //homeId = kaunsa home favourite kiya
  const homeId = req.body.id;
  const removeId = req.body.RemoveId;

  if (removeId) {

    if (user.favourites.includes(removeId)) {
      user.favourites = user.favourites.filter(fav => fav != removeId);
      await user.save();
    }
    res.redirect("/favorite")

  }
  else {
    if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
    }
    res.redirect("/favorite");
  }
}