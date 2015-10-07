'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  title: String,
  imgFilePath: String,
  content: String
});

module.exports = mongoose.model('Upload', UploadSchema);