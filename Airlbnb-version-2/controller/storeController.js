const express = require('express');
const Home = require('../model/home');
const Favorite = require('../model/favorite');

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
  Favorite.getFavorite((favorites) => {
    Home.fetchAll((addedHome) => {
      // const FavHome = favorites.map(homeId => addedHome.find(home => home.id === homeId));
      const FavHome = addedHome.filter(home => favorites.includes(home.id))
      res.render("store/favorite", { favorites: FavHome, pageTitle: "favorite" });
    })
  })

}

exports.postAddFavorite = (req, res) => {
  const homeId = req.body.id;
  const removeId = req.body.RemoveId;
  if (removeId) {

    Favorite.RemoveFromFavorites(removeId, err => {
      if (err) {
        console.log("Error while removing favorite: ", err);
      }
      res.redirect("/favorite");
    });
  }
  else {
    Favorite.addToFavorite(homeId, err => {
      if (err) {
        console.log("Error while marking favorites: ", err);
      }
      res.redirect("/favorite");
    })
  }
  
}