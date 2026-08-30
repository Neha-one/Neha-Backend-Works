const express = require('express');
const Home = require('../model/home');
const Favorite = require('../model/favorite');

exports.getIndex = (req, res) => {
  Home.fetchAll().then(addedHome => {
    res.render("store/index", { addedHome: addedHome, pageTitle: "index", currentPage: "index" });
  })
}
exports.getHome = (req, res) => {
  Home.fetchAll().then(addedHome => {
    res.render("store/home", { addedHome: addedHome, pageTitle: "home", currentPage: "home" });
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

      res.render("store/home-details", { house: house, pageTitle: "Home Details", currentPage: "Home Details" });
    }
  }).catch((error) => {
    console.log("Error while showing details", error);
  })
};

exports.getBooking = (req, res) => {
  res.render("store/booking", { pageTitle: "booking", currentPage: "booking" });
}
exports.getFavorite = (req, res) => {
  Favorite.getFavorite((favorites) => {
    Home.fetchAll().then(([addedHome]) => {
      // const FavHome = favorites.map(homeId => addedHome.find(home => home._id === homeId));
      const FavHome = addedHome.filter(home => favorites.includes(home._id))
      res.render("store/favorite", { favorites: FavHome, pageTitle: "favorite", currentPage: "favorite" });
    }).catch((error) => {
      console.log("Error Fetching Homes ", error)
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