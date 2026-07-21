const registeredHomes = [];

exports.getHome = (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', { registeredHomes: registeredHomes, PageTitle: "airbnb Home ", currentPage: "home" })
}

exports.getAddHome = (req, res, next) => {
  res.render('addHome', { PageTitle: 'Add Home', currentPage: 'addHome' })
}

exports.postAddHome = (req, res, next) => {
  // registeredHomes.push({ houseName: req.body.houseName, housePrice: req.body.housePrice, houseLocation: req.body.houseLocation, houseRating: req.body.houseRating, houseImage: req.body.houseImage });
  //----------OR DIRECT PASS ALL INFORMATION------------
  registeredHomes.push(req.body);

  console.log(req.body);
  res.render('HomeAdded', { PageTitle: 'home registered successfully', currentPage: 'HomeAdded' })
}