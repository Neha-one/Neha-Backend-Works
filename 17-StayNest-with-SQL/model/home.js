const db = require("../utils/database");


module.exports = class Home {
  constructor(imageURL, homeName, homePrice, location, rating, description, id) {
    (this.imageURL = imageURL,
      this.homeName = homeName,
      this.homePrice = homePrice,
      this.location = location,
      this.rating = rating,
      this.description = description,
      this.id = id);
  }

  save() {
    if (this.id) {
      return db.execute("UPDATE `property-details` SET imageURL=?, homeName=?, homePrice=?, location=?, rating=?,description=? WHERE id=?",
        [this.imageURL, this.homeName, this.homePrice, this.location, this.rating, this.description, this.id]
      );
    }
    else {
      return db.execute("INSERT INTO `property-details`(imageURL, homeName, homePrice, location, rating,description) VALUES(?,?,?,?,?,?)",
        [this.imageURL, this.homeName, this.homePrice, this.location, this.rating, this.description]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM `property-details`');
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM `property-details` WHERE id=?', [homeId]);
  }

  static DeleteById(homeId) {
    return db.execute('DELETE FROM `property-details` WHERE id=?', [homeId]);
  }
}; 