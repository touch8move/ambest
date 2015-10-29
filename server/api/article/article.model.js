'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: String,
	imgPath: String,
	content: String,
	
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	createdDate:{ type: Date, default: Date.now },
	updatedDate:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);