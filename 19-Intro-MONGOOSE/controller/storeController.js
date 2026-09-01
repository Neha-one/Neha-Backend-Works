const express = require('express');
const Home = require('../model/home');
const Favourite = require('../model/favourite');

exports.getIndex = (req, res) => {
  Home.find().then(addedHome => {
    res.render("store/index", { addedHome: addedHome, pageTitle: "index", currentPage: "index" });
  })
}
exports.getHome = (req, res) => {
  Home.find().then(addedHome => {
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


exports.getFavourite = (req, res) => {
  Favourite.find().then(favourites => {
    favourites = favourites.map(fav => fav.houseId.toString());
    Home.find().then(addedHome => {
      // const FavHome = Favourites.map(homeId => addedHome.find(home => home._id === homeId));
      const FavHome = addedHome.filter(home => favourites.includes(home._id.toString()))
      res.render("store/favorite", { Favourites: FavHome, pageTitle: "Favourite", currentPage: "Favourite" });
    }).catch((error) => {
      console.log("Error Fetching Homes ", error)
    })
  })
}

exports.postAddFavourite = (req, res) => {
  const homeId = req.body.id;
  const removeId = req.body.RemoveId;

  if (removeId) {

    Favourite.findOneAndDelete(removeId).then(() => {
      res.redirect("/favorite")
    })
  }
  else {
    Favourite.findOne({ houseId: homeId }).then(existFav => {
      if (existFav) {
        return res.redirect("/favorite");
      }

      const fav = new Favourite({ houseId: homeId });
      return fav.save();
    }).then(() => {
      res.redirect("/favorite");
    }).catch((err) => {
      console.log("Error while marking favourites", err);
    })
  }
}