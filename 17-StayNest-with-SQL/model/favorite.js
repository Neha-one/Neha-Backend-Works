const fs = require('fs')
const path = require('path');
const rootDir = require('../utils/path');
const FavoriteDataPath = path.join(
  rootDir,
  'data',
  'favorite.json'
);

module.exports = class Favorite {

  static addToFavorite(homeId, callback) {
    Favorite.getFavorite((favorites) => {
      if (favorites.includes(homeId)) {
        callback("Home is already marked favorite");
      }
      else {
        favorites.push(homeId);
        fs.writeFile(FavoriteDataPath, JSON.stringify(favorites), callback);
      }
    });
  }

  static getFavorite(callback) {

    fs.readFile(FavoriteDataPath, (err, data) => {

      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
  static RemoveFromFavorites(removeId, callback) {
    Favorite.getFavorite(favorites => {
      const RemoveFavHome = favorites.filter(fav => fav !== removeId);
      fs.writeFile(FavoriteDataPath, JSON.stringify(RemoveFavHome), callback);
    })
  }
};