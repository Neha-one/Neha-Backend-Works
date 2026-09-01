const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/database');

module.exports = class Home {
  constructor(imageURL, homeName, homePrice, location, rating, description, _id) {
    this.imageURL = imageURL;
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.location = location;
    this.rating = rating;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      const updateFields = {
        imageURL: this.imageURL,
        homeName: this.homeName,
        homePrice: this.homePrice,
        location: this.location,
        rating: this.rating,
        description: this.description
      }
      return db.collection('home').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields })

    }
    else {
      return db.collection('home').insertOne(this);

    }
  }

  static fetchAll() {

    const db = getDB();
    return db.collection('home').find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection('home').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static DeleteById(homeId) {
    const db = getDB();
    return db.collection('home').deleteOne({
      _id: new ObjectId(homeId)
    });
  }
}; 