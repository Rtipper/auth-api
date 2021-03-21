
'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-api';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true  
}

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    server.start(3333);
  })