var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')
const bcrypt = require('bcrypt')
// a12345678A
// const usercreate = {
// firstName: req.body.firstName,
// lastName: req.body.lastName,
// userName: req.body.userName,
// password: req.body.password,
// gender: req.body.gender,
// phoneNumber: req.body.phoneNumber
// }
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('signup', { msg: null });
});

router.post('/', async function (req, res) {
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.userName.trim() ||
        !req.body.password.trim() ||
        !req.body.phoneNumber.trim()
    ) {
        return res.status(401).render('signup', { msg: 'request failed ' })
    }
    const data = { firstName, lastName, userName, password, gender, phoneNumber } = req.body;
    if (data.userName.length < 3 || data.userName.length > 30) {
        return res.render('signup', { msg: "userName should  be between 3 and 30 characters" })
    }
    if (data.firstName.length < 3 || data.firstName.length > 50) {
        return res.render('signup', { msg: "firstName should  be between 3 and 50 characters" })
    }
    if (data.lastName.length < 3 || data.lastName.length > 50) {
        return res.render('signup', { msg: "lastName should  be between 3 and 50 characters" })
    }
    if (!req.body.password.match(regexPass)) {
        return res.status(401).render('signup', { msg: 'Invalid password' })
    }
    if (isNaN(req.body.phoneNumber) || req.body.phoneNumber.length > 10 || req.body.phoneNumber.length < 10) {
        return res.render('signup', { msg: "Phone Number should be a number and must be 10 character" })
    }
    try {
        const testUnique = await User.findOne({ userName: req.body.userName })
        const phoneUnique = await User.findOne({ phoneNumber: req.body.phoneNumber })
        if (testUnique || phoneUnique) {
            return res.render('signup', { msg: "username or phoneNumber already use " })
        } else {
            const user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber
            })
            res.redirect('/signIn')
        }
    } catch (error) {
        return res.status(401).json({ message: 'server error',error : error.message });
    }
})
module.exports = router;



// bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//         return res.render('signup', { msg: "server error" })
//     }
//     bcrypt.hash(req.body.password, salt, async function (err, hash) {
//         if (err) {
//             return res.render('signup', { msg: "server error" })
//         }
        
//     });
// }); 