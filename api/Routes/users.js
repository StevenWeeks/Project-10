'use strict'

const express = require('express')
const router = express.Router()
const auth = require('basic-auth')
const bcrypt = require('bcrypt')
const User = require('../models/schemas').User

// a function to validate emails, regex gotten from project resources.
function emailVali (email) {
  const check = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return check.test(email)
}

// POST /api/users 201 - Creates a user, sets the Location header to '/', and returns no content
// first test to see if the req body has a valid email, if not error.
// next find if there's already that email in the database, if not it's valid to make a new userRoutes
// then validate the user input, schema has validators built in, if again valid it'll save to db.
// then returns to header with a 201 status.

//for project 10, had to move userInfo out of the emailVali if  function so I could get
// all of the error messages to appear at the same time.
router.post('/', function (req, res, next) {
  let userInfo = new User(req.body)
  userInfo.validate(function (err, req, res) {
    if (err && err.name === 'ValidationError') {
      err.status = 400
      err.message = err.errors
      return next(err)
    }
  })
    User.find({ emailAddress: req.body.emailAddress }, function (err, users) {
      if (users.length !== 0) {
        const error = new Error('Email already in use')
        error.status = 400

        next(error)
      } else if (!emailVali(req.body.emailAddress)) {
        const error = new Error('InvalidEmail')
        error.status = 400

        next(error)
      } else {  userInfo.save(function (err, user) {
          if (err) {
            return next()
          } else {
            res.location('/')
            res.sendStatus(201)
          }
        })
      }
    })
  })

// the beastly code used to validate users, it sets the current user from the request
// it searches for an email in the database, then hashes and compares the password provided against
// the stored hashed password.
router.use((req, res, next) => {
  let currentUser = auth(req)

  if (currentUser) {
    User.findOne({ emailAddress: currentUser.name })
      .exec(function (err, user) {
        if (user) {
          bcrypt.compare(currentUser.pass, user.password, function (err, res) {
            if (res) {
              req.user = user
              next()
            } else {
              const error = new Error('InvalidPassword')
              error.status = 401
              next(error)
            }
          })
        } else {
          const error = new Error('InvalidUser')
          error.status = 401
          next(error)
        }
      })
  } else {
    const error = new Error('Login')
    error.status = 401
    next(error)
  }
})

router.get('/', function (req, res, next) {
  User.find({})
    .exec(function (err, user) {
      if (err) {
        console.log('oh no')
        next(err)
      } else {
        res.json(req.user)
      }
    })
})
module.exports = router
