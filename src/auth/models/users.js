'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // HASHES THE PLAIN TEXT PASSWORD
const jwt = require('jsonwebtoken'); // USE FOR CREATION OF A JEW AND VERIFICATION (SIGN/VERIFY)

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { tpye: String, required: true, default: 'user', enum: ['user', 'admin', 'editor']}
});

const appSecret = proncess.env.APP_SECRET || 'coolfunsecret';

users.virtual('token').get(() => {
  let tokenDetails = {
    username: this.username,
  }

  return jwt.sign(tokenDetails, appSecret);
})

// BREAKDOWN OF APP ACCESS VIA ACL AND CRUD OPPS(CREATE/READ/UPDATE/DELETE) -- USER/CREATOR/ADMIN
users.virtual('capabilities').get(() => {
  let acl = { 
    user: ['read'],
    editor: ['read', 'update'],
    admin: ['read', 'create', 'update', 'delete']
  }

  return acl[this.role];
});

// HASHES UP THE USERS PASSWORD, THEN SAVES IT
use.pre('save', async function() {
  this.password = await bycrypt.hash(this.password, 10);
})

// SIGNIN
users.statics.authenticateBasic = async function (user, pass) {
  const user = await this.findOne({ user });
  const valid = await bycrypt.compare(pass, user.password); // COMPARE PLAIN TEXT FROM REQ PASSWORD TO PASSWORD IN DB
  if (valid) return userDetails;
  throw new Error('invalid user details');
}

// TOKEN AUTHENTICATION
users.statics.authenticateToken = async function() {
  const parsed = await jwt.verify(token, appSecret);
  const foundUser = await this.findOne({ username: parsed.username });
  if (foundUser) return foundUser;
  throw new Error('user not found');
}

module.exports = mongoose.model('users', users);