'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
	title: String,
	items:[{
		imgFilePath: String,
		content: String
	}],
	createdBy:String,
  	createdDate:{ type: Date, default: Date.now },
	updatedDate:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', UploadSchema);