const fs = require('fs')
const path = require('path');
const rootDir = require('../utils/path');
const houseDataPath = path.join(
  rootDir,
  'data',
  'home.json'
);

module.exports = class Home {
  constructor(imageURL, homeName, homePrice, location, rating) {
    (this.imageURL = imageURL,
      this.homeName = homeName,
      this.homePrice = homePrice,
      this.location = location,
      this.rating = rating);
  }

  save() {
    this.id = Math.random().toString();

    Home.fetchAll((addedHome) => {
      addedHome.push(this);
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

