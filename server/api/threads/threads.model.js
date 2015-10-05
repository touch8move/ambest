'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThreadsSchema = new Schema({
  title: String,
  info: String,
  active: Boolean,
  contents: String
});

module.exports = mongoose.model('Threads', ThreadsSchema);