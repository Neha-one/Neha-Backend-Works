const db = require('../utils/database');

module.exports = class Skill {
  constructor(skillLogo, skillName, timeTaken, rating, description, id) {
    this.skillLogo = skillLogo;
    this.skillName = skillName;
    this.timeTaken = timeTaken;
    this.rating = rating;
    this.description = description;
    this.id = id;
  }

  save() {
    return db.execute('INSERT INTO homes (skillLogo, skillName, timeTaken, rating, description) VALUES (?,?,?,?,?)',[this.skillLogo, this.skillName, this.timeTaken, this.rating, this.description])
  }

  static fetchAll() {

    return db.execute("SELECT * FROM homes");

  }

  static findById(skillId, callback) {

  }

}