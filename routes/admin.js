const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')

router.get("/dashboardAdmin", (req, res) => {
    if (req.session.views) {
        req.session.views++
    } else {
        req.session.views = 1
    }
    if (req.session.user && req.cookies.user_seed && req.session.user.role === 'admin') {
        const user = req.session.user;
        res.render("dashboardAdmin", {
            user,
            views: req.session.views, msg: null
        });

    } else {
        res.redirect("/signIn");
    }
});

router.post('/createAdmin', async (req, res) => {
    const findAdmin = await User.findOne({ role: 'admin' });
    try {
        if (findAdmin) {
            return res.status(404)
        }
        const Admin = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            gender: req.body.gender,
            role: "admin",
            phoneNumber: req.body.phoneNumber
        })
        res.status(200).json({message : 'success'})
    } catch (error) {
        res.status(403).json({
            message: "server error",
            err: error.message
        })
    }
})

router.get("/manageBlogger", async (req, res) => {
    if (req.session.user && req.cookies.user_seed && req.session.user.role === 'admin') {
        const Bloggers = await User.find({role: 'blogger'})
        console.log(Bloggers);
        const user = req.session.user;
        res.render("blogger", {
            user,
            msg: null,
            Bloggers : Bloggers
        });

    } else {
        res.redirect("/signIn");
    }
});


router.get('/findBlogger', async (req, res) => {
    try {
        const Bloggers = await User.find({role: 'blogger'})
        console.log(Bloggers);
        // if (!Bloggers) {
        //     return res.render('blogger', { msg: 'No any bloggers', Bloggers })
        // }
        res.render('blogger', Bloggers)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})



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
// A12345678a


module.exports = router