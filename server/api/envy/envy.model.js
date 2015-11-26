'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EnvySchema = new Schema({
  title: String,
  envyItems: [{
    type: Schema.ObjectId,
    ref: 'envyItem'
  }],
  replys: [{
    type: Schema.ObjectId,
    ref: 'reply'
  }],
  likes: [{
    type: Schema.ObjectId,
    ref: 'like'
  }],
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created_at:{ type: Date }
  updated_at:{ type: Date }
});


EnvySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Envy', EnvySchema);