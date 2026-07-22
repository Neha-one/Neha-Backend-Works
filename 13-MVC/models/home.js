//Core module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

//temporary database
const registeredHomes = [];

module.exports = class Home {
  constructor(houseImage, houseName, houseLocation, housePrice, houseRating) {
    this.houseImage = houseImage;
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
  }
  save() {
    registeredHomes.push(this);
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
      console.log('file writing concluded.', error);
    });
  }

  static fetchAll() {
    return registeredHomes;
  }

}
