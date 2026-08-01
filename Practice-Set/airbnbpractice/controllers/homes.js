const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetchAll(registeredHomes =>
    res.render("store/home", {
      registeredHomes: registeredHomes,
      PageTitle: "airbnb Home ",
      currentPage: "home",
    }),
  );
};

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", { PageTitle: "Add Home", currentPage: "addHome" });
};


exports.getBooking = (req, res, next) => {
  res.render("store/booking", { PageTitle: "My booking", currentPage: "booking" });
};

exports.getFavorite = (req, res, next) => {
  res.render("store/favorite", { PageTitle: "My Favorites", currentPage: "favorites" });
};


exports.getHomeList = (req, res, next) => {
  Home.fetchAll(registeredHomes =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      PageTitle: "Home List ",
      currentPage: "home-list",
    }),
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseImage, houseName, houseLocation, housePrice, houseRating } =
    req.body;
  const home = new Home(
    houseImage,
    houseName,
    houseLocation,
    housePrice,
    houseRating,
  );

  home.save();

  res.render("host/HomeAdded", {
    PageTitle: "home registered successfully",
    currentPage: "HomeAdded",
  });
};
