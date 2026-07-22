const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  const registeredHomes = Home.fetchAll();
  res.render('home', { registeredHomes: registeredHomes, PageTitle: "airbnb Home ", currentPage: "home" })
}

exports.getAddHome = (req, res, next) => {
  res.render('addHome', { PageTitle: 'Add Home', currentPage: 'addHome' })
}

exports.postAddHome = (req, res, next) => {
  const { houseImage, houseName, houseLocation, housePrice, houseRating } = req.body;
  const home = new Home(houseImage, houseName, houseLocation, housePrice, houseRating);

  home.save();

  res.render('HomeAdded', { PageTitle: 'home registered successfully', currentPage: 'HomeAdded' })
}
