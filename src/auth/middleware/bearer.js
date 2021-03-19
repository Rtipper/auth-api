'use strict';

const users = require('../models/users.js');

module.exports = async (req, res, next) => {
  try {
    if(!req.headers.authorization) throw new Error('Sorry, you are not authorized');

    const token = req.headers.authorization.split(' ').pop();
    const validUser =  await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();
  } catch (e) {
    console.error(e);
  }
}