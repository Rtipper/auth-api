'use strict';

const express = require('express');

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');

const auth = express.Router();

// USER IS ATTACHED TO REQ.BODY -- THINK OF AS A FRONT END FORM
auth.post('/signup', async (req, res) => {
  let user = new User(req.body);
  const record = user.save();
  res.status(201).json(record) // SENDING BACK TO SEE/TEST
});

auth.post('/signin', basicAuth, (req, res) => {
  let userDetails = {
    details: req.user,
    token: req.user.token
  }
  res.status(200).json(userDetails);
})

auth.post('/must-be-signed-in', bearerAuth, (req, res) => {
  res.status(200).send('you were able to sign in');
});

auth.get('/protected-route', bearerAuth, permissions('read'),(req, res) => {
  res.status(200).send('you are signed in and have proper permissions');
});

module.exports = auth;