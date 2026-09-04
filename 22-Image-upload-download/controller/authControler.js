const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res) => {
  res.render('auth/login', { pageTitle: "Login", currentPage: "login", isLoggedIn: false, errors: [], oldInput: { email: "" } })
}

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render('auth/login', {
      pageTitle: "Login", currentPage: "login", isLoggedIn: false,
      errors: ['User does not exists'],
      oldInput: { email },
    })
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render('auth/login', {
      pageTitle: "Login", currentPage: "login", isLoggedIn: false,
      errors: ['invalid password'],
      oldInput: { email },
    })
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}

exports.getSignup = (req, res) => {
  res.render('auth/signup', { pageTitle: "Sign up", currentPage: "signup", isLoggedIn: false, errors: [], oldInput: { firstName: '', lastName: '', email: '', userType: '' }, })
}

exports.postSignup = [
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
    .withMessage("Password must contain at least one number").matches(/[@#]/)
    .withMessage('Password must contain at least one @ or # letter')
    .trim(),

  //---CONFIRM PASSWORD VALIDATION---
  check('confirmpassword')
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: "Sign Up",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, userType },
      })
    }
    console.log(req.body);


    bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({ firstName, lastName, email, password: hashedPassword, userType });
        return user.save();
      }).then(() => {
        res.redirect("/login");
      })
      .catch(err => {
        return res.status(422).render('auth/signup', {
          pageTitle: "Sign Up",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, userType },
        })
      })
  }]