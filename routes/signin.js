var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.user && req.cookies.user_seed) {
    res.redirect("/profile");
  } else {
    res.render("login", { msg: null });
  }
});

router.post('/', async function (req, res) {
  try {
    if (!req.body.userName || !req.body.password) {
      return res.status(403).render("login", { msg: 'require field' });
    }
    const loginUser = await User.findOne({ userName: req.body.userName })
    if(!loginUser){
      return res.render("login", { msg: 'Invalid username or password' })
    }
    if (loginUser.role === 'admin') {
      bcrypt.compare(req.body.password, loginUser.password, function (err, result) {
        if (err) {
          return res.render("login", { msg: 'something went wrong'})
        }
        if(!result){
          return res.render("login", { msg: 'Invalid username or password' })
        }
        req.session.user = loginUser;
      res.redirect("/admin/dashboardAdmin");
      });
    } else {
      bcrypt.compare(req.body.password, loginUser.password, function (err, result) {
        if (err) {
          return res.render("login", { msg: 'something went wrong'})
        }
        if(!result){
          return res.render("login", { msg: 'Invalid username or password' })
        }
        req.session.user = loginUser;
      ;res.redirect("/profile");
      })
    }
  } catch (error) {
    res.status(403).json({
      message: "server error",
      err: error.message
    })
  }
})

module.exports = router;

// A12345678a
// Q12345678q