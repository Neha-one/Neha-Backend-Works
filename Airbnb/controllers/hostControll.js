const express = require('express');
const Skill = require('../model/home');

exports.getData = (req, res) => {
  res.render("host/Add-Skill", { pageTitle: "add Skill" })
}

exports.postData = (req, res) => {
  const { skillLogo, skillName, timeTaken, rating } = req.body;
  const home = new Skill(skillLogo, skillName, timeTaken, rating);
  home.save();

  res.redirect("/skill-added");
}

exports.addedSkills = (req, res) => {
  res.render("host/skill-added", { pageTitle: "Skill added" })
}


exports.getHostHome = (req, res) => {
  Skill.fetchAll(addedSkillList => {
    res.render("host/host-home", {
      pageTitle: "host skill list",
      addedSkillList: addedSkillList,
    })
  })
}