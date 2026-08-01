const express = require('express');
const Skill = require('../model/home');

exports.getIndex = (req, res) => {
  Skill.fetchAll(addedSkillList => {
    res.render("store/index", {
      pageTitle: "Skill Home",
      addedSkillList: addedSkillList,
    })
  })
}
exports.getHome = (req, res) => {
  Skill.fetchAll(addedSkillList => {
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
  Skill.fetchAll(addedSkillList => {
    res.render("store/favorite", {
      pageTitle: "Favorite",
      addedSkillList: addedSkillList,
    })
  })
}