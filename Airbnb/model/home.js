const path = require('path');
const rootDir = require('../utils/path');
const fs = require('fs');

module.exports = class Skill {
  constructor(skillLogo, skillName, timeTaken, rating) {
    this.skillLogo = skillLogo;
    this.skillName = skillName;
    this.timeTaken = timeTaken;
    this.rating = rating;
  }

  save() {
    Skill.fetchAll((addedSkillList) => {
      addedSkillList.push(this);
      const skillDataPath = path.join(rootDir, 'data', 'skills.json');
      fs.writeFile(skillDataPath, JSON.stringify(addedSkillList), error => {
        console.log('file writing concluded.', error);
      });
    })
  }
  
  static fetchAll(callback) {
    const skillDataPath = path.join(rootDir, 'data', 'skills.json');
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
}