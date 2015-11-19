'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
	// articleId: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Article'
	// },
	// challengeId: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Challenge'
	// },
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	createdDate:{ type: Date, default: Date.now },
	updatedDate:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', LikeSchema);