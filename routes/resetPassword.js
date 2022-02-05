const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const User = require("../model/user")
const bcrypt = require('bcrypt')

router.get('/' , (req , res) => {
    const user = req.session.user
    if(req.session.user && req.cookies.user_seed){
      res.render('resetPassword' ,{ user , msg : null})  
    }else{
        res.redirect('/signIn')
    }
})



router.post('/' , async (req , res) => {
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const user_session = req.session.user
    // console.log(user_session);
    const data = {password , NewPassword , ReNewPassword} = req.body
try {
    if(!data){
        return res.render('resetPassword' , {msg : "require filed"})
    }
    const findPass = await User.findOne({username : user_session.username})
    // console.log(findPass);
    if (findPass) {
         bcrypt.compare(req.body.password, findPass.password, function (err, result) {
             console.log(result);
          if (err) {
            return res.render('resetPassword', { msg: 'something went wrong'})
          }
          if(!result){
            return res.render('resetPassword', { msg: 'Invalid username or password' })
          }
        });
    }
    if(req.body.NewPassword !== req.body.ReNewPassword){
        return res.render('resetPassword' , {msg : "pass and repass not equal"})
    }
    if (!req.body.NewPassword.match(regexPass)) {
      return res.render("profile", { msg: "password should  be more 8 character and has one a-A", views: req.session.views, user })
  }
    const resetPassword = await User.findOneAndUpdate( user_session , {password:req.body.NewPassword }  , {new : true})
    await new User(resetPassword).save()
    if(!resetPassword){
      return  res.render('resetPassword' , {msg : "update password failed" })
    }
    req.session.user = resetPassword
    if(req.session.user.role === "admin"){
      return res.redirect('/admin/dashboardAdmin')
    }
      
    return res.redirect('/profile')
} catch (error) {
    console.log(error.message);
    res.render('resetPassword' , {msg : "problem in server"})
}
})
module.exports = router