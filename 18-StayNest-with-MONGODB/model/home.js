const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/database');

module.exports = class Home {
  constructor(imageURL, homeName, homePrice, location, rating, description, _id) {
    (this.imageURL = imageURL,
      this.homeName = homeName,
      this.homePrice = homePrice,
      this.location = location,
      this.rating = rating,
      this.description = description,
      this._id = _id);
  }

  save() {
    const db = getDB();
    return db.collection('home').insertOne(this);


    // if (this.id) {
    //   return db.execute("UPDATE `property-details` SET imageURL=?, homeName=?, homePrice=?, location=?, rating=?,description=? WHERE id=?",
    //     [this.imageURL, this.homeName, this.homePrice, this.location, this.rating, this.description, this.id]
    //   );
    // }
    // else {
    //   return db.execute("INSERT INTO `property-details`(imageURL, homeName, homePrice, location, rating,description) VALUES(?,?,?,?,?,?)",
    //     [this.imageURL, this.homeName, this.homePrice, this.location, this.rating, this.description]
    //   );
    // }
  }

  static fetchAll() {

    const db = getDB();
    return db.collection('home').find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection('home').find( { _id: new ObjectId(String(homeId)) }).next();
    // return db.execute('SELECT * FROM `property-details` WHERE id=?', [homeId]);
  }

  static DeleteById(homeId) {
    // return db.execute('DELETE FROM `property-details` WHERE id=?', [homeId]);
  }
}; 