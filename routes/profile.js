const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')

// router.get("/", (req, res) => {
//     res.render("profile");
// });

router.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1
  }
  if (req.session.user && req.cookies.user_seed) {
    const user = req.session.user;
    res.render("profile", {
      user,
      views: req.session.views, msg: null
    });

  } else {
    res.redirect("/signIn");
  }
});

router.post("/", async (req, res) => {
  
  const user = req.session.user;
  if (req.session.user && req.cookies.user_seed) {
    const data = { firstName, lastName, userName, password, gender, phoneNumber } = req.body;
    if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length > 10 || req.body.phoneNumber.length < 10) {
      return res.render("profile", { msg: "Phone Number should be a number and must be 10 character", views: req.session.views, user })
    }
    if (data.firstName.length < 3 || data.firstName.length > 50){
      return res.render("profile", { msg: "username should  be between 3 and 50 characters", views: req.session.views, user })
    }
    if (data.lastName.length < 3 || data.lastName.length > 50){
      return res.render("profile", { msg: "firstName should  be between 3 and 50 characters", views: req.session.views, user })
    }
    if (data.userName.length < 3 || data.userName.length > 30){
      return res.render("profile", { msg: "lastName should  be between 3 and 30 characters", views: req.session.views, user })
    }
    if (data.gender !== 'male' && data.gender !== 'female'){
      console.log(data.gender);
      return res.render("profile", { msg: "gender should  be male or female", views: req.session.views, user })
    }
      if (!req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.userName.trim() ||
        !req.body.gender.trim() ||
        !req.body.phoneNumber.trim()
      ) {
        return res.status(401).json({ message: 'Invalid' })
      }
    if (req.session.user.userName !== req.body.userName && await User.findOne({ userName: req.body.userName }))
      return res.render("profile", { msg: "username already in use", views: req.session.views, user })
    try {
      const updateUser = await User.findOneAndUpdate(user, data, { new: true }).lean();
      console.log(updateUser);
      if (!updateUser) {
        return res.render('profile', { msg: 'update user failed', views: req.session.views, user });
      }
      req.session.user = updateUser;
      return res.render("profile", { msg: 'update success', views: req.session.views, user });
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  } else {
    return res.redirect("/signIn");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("user_seed");
  res.redirect("/signIn");
});

router.get("/delete", async (req, res) => {
  if (req.session.user && req.cookies.user_seed){
     const userD = req.session.user;
  // console.log(userD);
  // const datA = { firstName, lastName, userName, password, gender, phoneNumber } = req.body;
  try {
    const deleteUser = await User.findOneAndDelete(userD.username)
    if (!deleteUser) {
      return res.render('profile',{ msg: 'delete user failed'});
    }
    req.session.destroy();
    res.clearCookie("user_seed");
    return res.status(200).redirect('/signup')
  } catch (error) {
    return res.status(500).json({ message : "error server" , err : error.message})
  }
  }
 
})

router.get('/dark', (req, res) => {
  const dark = req.body.dark
  res.cookie('theme', dark)
  res.json(true)
})
// A12345678a

module.exports = router;
