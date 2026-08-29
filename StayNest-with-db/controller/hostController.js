const express = require('express');
const Home = require('../model/home');

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", { pageTitle: "add-home", currentPage: "add-home", editing: false });
}


exports.getHostHome = (req, res, next) => {
  Home.fetchAll(addedHome => {
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

  home.save();
  res.redirect('/home')
}



exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId, home => {
    if (!home) {
      console.log("error while editing.")
      return res.redirect("/host-home");
    }
    else {
      // console.log(homeId, editing, home);
      res.render("host/edit-home", { home: home, editing: editing, pageTitle: "Edit Page", currentPage: "host-home" });

    }
  }
  )
}
exports.postEditHome = (req, res) => {
  const { id, imageURL,
    homeName,
    homePrice,
    location,
    rating, description
  } = req.body;
  const home = new Home(imageURL,
    homeName,
    homePrice,
    location,
    rating, description
  );
  home.id = id;
  home.save();
  res.redirect('/host-home')
}

exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;
  Home.DeleteById(homeId, err => {
    if (err) {

      console.log("Error while deleting ", err);
    }
    res.redirect('/host-home')
  })
}
