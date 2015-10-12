'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  title: String,
  items:[{
  	imgFilePath: String,
  	content: String
  }],
  challenges:[{
  	title: String,
  	items:[{
  		imgFilePath: String,
  		content: String
  	}]
  }]
});

module.exports = mongoose.model('Upload', UploadSchema);