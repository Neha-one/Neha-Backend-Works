const fs = require('fs')
const path = require('path');
const rootDir = require('../utils/path');
const Favorite = require('./favorite');
const houseDataPath = path.join(
  rootDir,
  'data',
  'home.json'
);

module.exports = class Home {
  constructor(imageURL, homeName, homePrice, location, rating,description) {
    (this.imageURL = imageURL,
      this.homeName = homeName,
      this.homePrice = homePrice,
      this.location = location,
      this.rating = rating,
      this.description = description);
  }

  save() {
    Home.fetchAll((addedHome) => {
      if (this.id) {
        addedHome = addedHome.map(home =>
          home.id === this.id ? this : home
        );
      }
      else {
        this.id = Math.random().toString();
        addedHome.push(this);
      }

      fs.writeFile(houseDataPath, JSON.stringify(addedHome), error => {
        console.log("file writing concluded.", error);
      })
    });
  }

  static fetchAll(callback) {

    fs.readFile(houseDataPath, (err, data) => {

      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll(addedHome => {
      const houseFound = addedHome.find(house =>
        house.id === homeId);
      callback(houseFound);
    })
  }

  static DeleteById(homeId, callback) {
    Home.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId)
      fs.writeFile(houseDataPath, JSON.stringify(homes), error => {
        Favorite.RemoveFromFavorites(homeId, callback)
      })
    });
  }
};
