'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReplySchema = new Schema({
	// articleId: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Challenge'
	// },
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	text: String,
	created_at:{ type: Date },
  	updated_at:{ type: Date }
})

ReplySchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


module.exports = mongoose.model('Reply', ReplySchema);