const express = require('express');
const mongoose = require('mongoose');

//Defining Routes where we can house our endpoints (api calls)
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DB CONFIG
const db = require('./config/keys').mongoURI;

//Connect to Mongo (calls a promise)
mongoose
    .connect(db) //Pending (kinda)
    .then(() => console.log('MongoDB connected!')) //Success
    .catch(err => console.log(err)); //rejected

app.get('/', (req, res) => res.send('hello!!!'));

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 5000;

app.listen(port, () => console.log(`Server running on PORT ${port}`));

