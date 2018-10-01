const express = require('express');
const path =  require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to DB
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app =  express();

const users =  require('./routes/users');

//PORT number
const port = 3000;//process.env.PORT || 8080;

//CORS middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start server
app.listen(port, () => {
    console.log('server started on port ' + port);
});
