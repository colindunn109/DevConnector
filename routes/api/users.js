const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// This is the API call, so we dont include the route specified in server.js
// so this call will send us to whatever app.use that corresponds to this users file
// meaning /api/users/{API_CALL}

// @route   GET api/users/test
// @desc    Tests users route
// @access  Private
router.get('/test', (req, res) => res.json({msg: "users works"}));


// @route   POST api/users/test
// @desc    Registers a user
// @access  Public
router.post("/register", async (req, res) => {
    let user = await User.findOne({email: req.body.email}); // init new user by email
    if (user) { // if it exist throw an error
        return res.status(400).json({email: "Email already exists"})
    } 
    else { // make our avatar
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        const newUser = new User({ // create new user in our database
            name: req.body.name,
            email: req.body.email,
            avatar: avatar,
            password: req.body.password
        });
 
        let salt = await bcrypt.genSalt(10); // generate the salt 
        newUser.password = await bcrypt.hash(newUser.password, salt); // set our passsword to the hashed and salted password 
        let user = await newUser.save(); // save this user into our db
        res.json(user); // output the json
    }
});

// @route   POST api/users/login
// @desc    Login User / returnning jwt
// @access  Public
router.post('/login', async (req,res) => {
    const password = req.body.password;

    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({email: "user email not found"});
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        const payload = { id: user.id, name: user.name, avatar: user.avatar }
        jwt.sign(
            payload, 
            keys.secretOrKey, 
            {expiresIn: 3600}, (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
        });
    }
    else {
        return res.status(400).json({password: "incorrect password"});
    }
})

// @route   GET api/users/current
// @desc    returns current user
// @access  Private
router.get(
    '/current', 
    passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
});

module.exports = router;