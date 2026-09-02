const express = require('express');
const { check, validationResult } = require('express-validator');

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    pageTitle: "Sign Up", currentPage: "signup", isLoggedIn: false,
    errorsMessages: [],
    oldInput: { firstName: '', lastName: '', email: '', password: '', userType: '' }
  })
}
exports.getLogin = (req, res) => {
  res.render('auth/login', { pageTitle: "Login", currentPage: "login", isLoggedIn: false })
}

exports.postsignup = [
  //---FIRST NAME VALIDATION---
  check('firstName')
    // .notEmpty()
    // .withMessage('First name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters'),

  //---LAST NAME VALIDATION---
  check('lastName')
    .trim()
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Last name can only contain letters'),

  //---EMAIL VALIDATION---
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  //---PASSWORD VALIDATION---
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")    .matches(/[@#]/)
    .withMessage('Password must contain at least one @ or # letter')
    .trim(),

  //---CONFIRM PASSWORD VALIDATION---
  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  //---USER TYPE VALIDATION---
  check('userType')
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

  //---Terms Accepted validation---
  check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions')
    .custom((value) => {
      if (value !== 'on') {
        throw new Error('You must accept the terms and conditions');
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    console.log("req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: "Sign Up",
        currentPage: "signup",
        isLoggedIn: false,
        errorsMessages: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, userType }
      })
    }
    res.redirect("/login");
  }];

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}