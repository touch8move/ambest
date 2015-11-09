'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CardinfoSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Cardinfo', CardinfoSchema);