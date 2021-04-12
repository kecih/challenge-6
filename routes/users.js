var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require("../models/UserSchema");

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: "Login Page"
  });
});

// Halaman Register
router.get('/register', function (req, res, next) {
  res.render('register', {
    title: "Register Page"
  });
});

// Action Login
router.post('/login', function(req, res, next){
  const {email, password} = req.body;

  let errors = [];

  if(!email || !password){
    errors.push({msg: "Please complete the required data!"});
  }

  if(errors.length > 0){
    res.render("login", {
      errors,
      email,
      password
    })
  }else{
    User.findOne({email:email}).then(user => {
      if(user){
        if(bcrypt.compareSync(password, user.password)){
          res.redirect("/books");
        }else{
          errors.push({msg: "Incorrect Password"});
          res.render("login", {
            errors
          });
        }
      }else{
        errors.push({msg: "Incorrect Email"});
        res.render("login", {
          errors
        });
      }
    })
  }
})

// Action Register
router.post('/register', function (req, res) {
  const {
    name,
    email,
    password,
    password2
  } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please complete the required data!"
    });
    console.log("Please complete the required data!");
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords are not the same"
    });
    console.log("Passwords are not the same");
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({
      email: email
    }).then(
      user => {
        if (user) {
          console.log("Email already registered");
          errors.push({
            msg: "Email already registered"
          });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          newUser
            .save()
            .then(user => {
              console.log("Registration Success!, Continue to Login");
              res.redirect('/auth/login');
            })
            .catch(err => console.log(err))
        }
      }
    )
  }
});

// Logout
router.get("/logout", function(req, res){
  res.redirect("/");
});

module.exports = router;