  'use strict';

const mongoose = require('mongoose');

const clothesSchema= mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true},
  type: { type:String, uppercase: true, enum: ['SHIRT', 'PANTS', 'JACKET']}
});

const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;