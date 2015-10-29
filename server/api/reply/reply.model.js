'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReplySchema = new Schema({
	articleId: {
		type: Schema.ObjectId,
		ref: 'Challenge'
	},
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	content: String,
	createdDate:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('Reply', ReplySchema);