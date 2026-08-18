const express = require('express');
const Skill = require('../model/home');

exports.getIndex = (req, res) => {
  Skill.fetchAll().then(([addedSkillList]) => {
    res.render("store/index", {
      pageTitle: "Skill Home",
      addedSkillList: addedSkillList,
    })
    console.log("reslut is here", addedSkillList)
  }).catch((error) => {
    console.log("error generate", error);
  });
}

exports.getHome = (req, res) => {
  Skill.fetchAll().then(([addedSkillList]) => {
    res.render("store/home", {
      pageTitle: "skills list",
      addedSkillList: addedSkillList,
    })
  })
}

exports.getBooking = (req, res) => {
  res.render("store/booking", { pageTitle: "Booking" });
}

exports.getFavorite = (req, res) => {
  Skill.fetchAll().then(([addedSkillList]) => {
    res.render("store/favorite", {
      pageTitle: "Favorite",
      addedSkillList: addedSkillList,
    })
  })
}
exports.getSkillDetails = (req, res) => {
  const skillId = req.params.skillId;
  Skill.findById(skillId, skill => {
    if (!skill) {
      console.log("skill not found");
      res.redirect("/home")
    }
    else {
      console.log("skill details found", skill);
      res.render("store/skill-details", { pageTitle: "Home", skill: skill });
    }
  })
};

exports.postFavorite = (req, res) => {
  console.log("came to favorite", req.body);
  // const skillId = req.body.skillId;
  // console.log("favorite with id: ", skillId);
  res.redirect("/favorite");
}