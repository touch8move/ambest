'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EnvyItemSchema = new Schema({
  imgPath:String,
  fileName:String,
  text: String,
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created_at:{ type: Date },
  updated_at:{ type: Date }
});


EnvyItemSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('EnvyItem', EnvyItemSchema);