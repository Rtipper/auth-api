'use strict';

const base64 = require('base-64');
const mongoose = require('mongoose');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) throw new Error
}