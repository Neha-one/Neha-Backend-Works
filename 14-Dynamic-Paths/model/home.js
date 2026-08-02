const path = require('path');
const rootDir = require('../utils/path');
const fs = require('fs');

const skillDataPath = path.join(rootDir, 'data', 'skills.json');

module.exports = class Skill {
  constructor( skillLogo, skillName, timeTaken, rating) {
    this.skillLogo = skillLogo;
    this.skillName = skillName;
    this.timeTaken = timeTaken;
    this.rating = rating;
  }

  save() {
    this.id = Math.floor(Math.random() * 500).toString();
    Skill.fetchAll((addedSkillList) => {
      addedSkillList.push(this);
      fs.writeFile(skillDataPath, JSON.stringify(addedSkillList), error => {
        console.log('file writing concluded.', error);
      });
    })
  }

  static fetchAll(callback) {
    fs.readFile(skillDataPath, (err, data) => {
      if (!err) {
        // addedSkillList = ;
        callback(JSON.parse(data));
      }
      else {
        callback([]);
      }
    })
  }

  static findById(skillId, callback) {
    this.fetchAll(skills => {
      const skillFound = skills.find(skill => skill.id === skillId);
      callback(skillFound);
    })
  }

}