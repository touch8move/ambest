'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChallengeSchema = new Schema({
	// articleId: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Article'
	// },
	title: String,
	challengeItems: [{
		type: Schema.ObjectId,
		ref: 'ChallengeItem'
	}],
	likes: [{
		type: Schema.ObjectId,
		ref: 'Like'
	}],
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	} ,
	createdDate:{ type: Date, default: Date.now },
	updatedDate:{ type: Date, default: Date.now }
})

module.exports = mongoose.model('Challenge', ChallengeSchema);