//Core module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

//temporary database
// let registeredHomes = [];

module.exports = class Home {
  constructor(houseImage, houseName, houseLocation, housePrice, houseRating) {
    this.houseImage = houseImage;
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
  }
  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'homes.json');
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
        console.log('file writing concluded.', error);
      });
    })

  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      // console.log('file read : ', err, data);
      callback(!err ? JSON.parse(data) : [])
      //----OR-----
      // if (!err) {
      //   registeredHomes = JSON.parse(data);
      //   callback(registeredHomes);
      // }
      // else {
      //   callback([]);
      // }
    })
  }

}
