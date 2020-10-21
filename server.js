require('rootpath')();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('_helpers/error-handler');
const routes = require('./routes');

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type,X-Requested-With,cache-control,pragma');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// api routes
app.use('/api', routes);

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mean_blog');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', function () {
  console.info('Successfully connected to the database');
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});