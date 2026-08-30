const express = require('express');
const Home = require('../model/home');

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", { pageTitle: "add-home", currentPage: "add-home", editing: false });
}


exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then(([addedHome]) => {
    res.render("host/host-home", { addedHome: addedHome, pageTitle: "host-home", currentPage: "host-home" });
  });
};

exports.postAddHome = (req, res) => {
  const { imageURL,
    homeName,
    homePrice,
    location,
    rating,
    description
  } = req.body;
  const home = new Home(imageURL,
    homeName,
    homePrice,
    location,
    rating, description
  );

  home.save().then(() => {
    res.redirect('/home')
  }).catch((error) => {
    console.log("Error adding home", error)
  });
};



exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(([home]) => {
    const house = home[0];
    if (!house) {
      console.log("error while editing.")
      return res.redirect("/host-home");
    }
    else {
      res.render("host/edit-home", { home: house, editing: editing, pageTitle: "Edit Page", currentPage: "host-home" });
    }
  })
}
exports.postEditHome = (req, res) => {
  const { imageURL,
    homeName,
    homePrice,
    location,
    rating, description, id
  } = req.body;
  const home = new Home(imageURL,
    homeName,
    homePrice,
    location,
    rating, description, id
  );
  home.save().then(() => {
    res.redirect('/host-home');
  }).catch((error) => {
    console.log("Error adding home", error)
  });
}

exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;
  Home.DeleteById(homeId).then(() => {
    res.redirect('/host-home')
  }).catch((err) => {
    console.log("Error while deleting ", err);
  })
}