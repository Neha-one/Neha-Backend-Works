const express = require('express');
const Home = require('../model/home');
const fs = require('fs');

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", { pageTitle: "add-home", currentPage: "add-home", editing: false, isLoggedIn: req.isLoggedIn });
}


exports.getHostHome = (req, res, next) => {
  Home.find().then(addedHome => {
    res.render("host/host-home", { addedHome: addedHome, pageTitle: "host-home", currentPage: "host-home", isLoggedIn: req.isLoggedIn });
  });
};

exports.postAddHome = (req, res) => {

  const {
    houseName,
    housePrice,
    location,
    rating,
    description
  } = req.body;
  // console.log(req.files);

  if (!req.files.photo || !req.files.pdf) {
    return res.status(422).send("no image");
  }
  const photo = req.files.photo[0].path;
  const ruleBook = req.files.pdf[0].path;

  const home = new Home({
    photo,
    ruleBook,
    houseName,
    housePrice,
    location,
    rating, description
  }
  );
  home.save().then(() => {
    console.log("home saved succesfully")
    res.redirect('/home');
  }).catch((error) => {
    console.log("Error adding home", error)
  });
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
  const {
    houseName,
    housePrice,
    location,
    rating,
    description,
    id
  } = req.body;

  console.log("FILES:", req.files);

  Home.findById(id).then((home) => {
    if (!home) {
      return res.redirect("/host/host-home");
    }

    home.houseName = houseName;
    home.housePrice = housePrice;
    home.location = location;
    home.rating = rating;
    home.description = description;

    // New photo
    if (req.files && req.files.photo) {
      console.log("New photo:", req.files.photo[0].path);

      if (home.photo) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Old photo delete error:", err.message);
          }
        });
      }

      home.photo = req.files.photo[0].path;
    }

    // New PDF
    if (req.files && req.files.pdf) {
      console.log("New PDF:", req.files.pdf[0].path);

      if (home.ruleBook) {
        fs.unlink(home.ruleBook, (err) => {
          if (err) {
            console.log("Old PDF delete error:", err.message);
          }
        });
      }

      home.ruleBook = req.files.pdf[0].path;
    }

    return home.save();

  }).then(() => {
    console.log("Home updated successfully");
    res.redirect('/host/host-home');

  }).catch(err => {
    console.log("Error while updating:", err);
  });
};
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