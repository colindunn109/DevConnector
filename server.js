const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Defining Routes where we can house our endpoints (api calls)
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const home = require('./routes/api/home');

const app = express();

// Bodyparser middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB CONFIG
const db = require('./config/keys').mongoURI;

//Connect to Mongo (calls a promise)
mongoose
    .connect(db) //Pending
    .then(() => console.log('MongoDB connected!')) //Success
    .catch(err => console.log(err)); //rejected

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/', home);


const port = 5000;

app.listen(port, () => console.log(`Server running on PORT ${port}`));

