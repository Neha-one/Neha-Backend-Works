const { getDB } = require('../utils/database');

module.exports = class Favorite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
  return db.collection('favourites').findOne({ houseId: this.houseId }).then(ExistFav => {
      if (!ExistFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
  }

  static getFavorite() {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static RemoveFromFavorites(removeId) {
    const db = getDB();
    return db.collection('favourites').deleteOne({
      houseId: removeId
    });
  }
};