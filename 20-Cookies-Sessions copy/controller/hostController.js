const express = require('express');
const Home = require('../model/home');

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", { pageTitle: "add-home", currentPage: "add-home", editing: false, isLoggedIn: req.isLoggedIn });
}


exports.getHostHome = (req, res, next) => {
  Home.find().then(addedHome => {
    res.render("host/host-home", { addedHome: addedHome, pageTitle: "host-home", currentPage: "host-home", isLoggedIn: req.isLoggedIn });
  });
};

exports.postAddHome = (req, res) => {
  const { imageURL,
    houseName,
    housePrice,
    location,
    rating,
    description
  } = req.body;
  const home = new Home({
    imageURL,
    houseName,
    housePrice,
    location,
    rating, description
  }
  );

  home.save().then(() => {
    console.log("home saved succesfully")
  }).catch((error) => {
    console.log("Error adding home", error)
  });
  res.redirect('/home')
};



exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("error while editing.")
      return res.redirect("/host/host-home");
    }
    else {
      res.render("host/edit-home", { home: home, editing: editing, pageTitle: "Edit Page", currentPage: "host-home", isLoggedIn: req.isLoggedIn });
    }
  })
}
exports.postEditHome = (req, res) => {
  const { imageURL,
    houseName,
    housePrice,
    location,
    rating, description, id
  } = req.body;
  Home.findById(id).then((home) => {
    if (!home) {
      return res.redirect("/host/host-home");
    }
    home.imageURL = imageURL;
    home.houseName = houseName;
    home.housePrice = housePrice;
    home.location = location;
    home.rating = rating;
    home.description = description;
    return home.save();
  }).then((result) => {
    console.log("Home updated ", result);
    res.redirect('/host/host-home');
  }).catch(err => {
    console.log("Error while updating", err);
  })
}

exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;
  console.log("Deleting ID:", homeId);
  Home.findByIdAndDelete(homeId).then((result) => {
    console.log(result);
    res.redirect('/host/host-home')
  }).catch((err) => {
    console.log("Error while deleting ", err);
  })
}