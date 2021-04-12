var express = require('express');
var router = express.Router();

// Halaman Welcome
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Admin' });
});

// Halaman Dashboard
router.get("/allBooks", function(req, res, next){
  res.render("book/allBooks", {title: "View All Books"});
});

module.exports = router;
