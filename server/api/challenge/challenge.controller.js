'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    async = require('async')

var _ = require('lodash');

var Challenge = require('./challenge.model');
var ChallengeItem = require('./challengeItem.model')
var Article = require('../article/article.model')

var _PUBLICPATH = 'public/'
var tmpFilePath = path.resolve('tmp/')
var publicFilePath = path.resolve(_PUBLICPATH)

// Get list of challenges
exports.index = function(req, res) {
  console.log('rep.params', req.params)
  Challenge.find({articleId:req.params.id}).populate('challengeItems').exec(function (err, challenges) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(challenges)
  });
};

// Get a single challenge
exports.show = function(req, res) {
  console.log('show')
  Challenge.findOne(req.params.id, function (err, challenge) {
    if(err) { return handleError(res, err); }
    if(!challenges) { return res.status(404).send('Not Found'); }
    console.log('challenge:', challenge)
    return res.json(challenge);
  });
};

// Creates a new challenge in the DB.
exports.create = function(req, res) {
  var creator = req.user
  Article.findById(req.body.articleId, function (err, article) {
    console.log('req.body:', req.body)  
    var challengeItems = []
    var _challenge = {
      articleId: req.body.articleId,
      title: req.body.title,
      createdBy: creator
    }
    Challenge.create(_challenge, function (err, challenge) {
      async.each(req.body.challengeItems, function(item, callback) {
        var publicFileName = challenge._id + item.imgPath
        var oldFileName = path.resolve(tmpFilePath, item.imgPath)
        var newFileName = path.resolve(_PUBLICPATH, './' + publicFileName)
        console.log('oldFileName:', oldFileName)
        console.log('newFileName:', newFileName)
        fs.rename(
          oldFileName, 
          newFileName, 
          function(err) {
            if(err) { 
              console.log('fs.rename error: ', err)
              callback(err)
            }
            item.imgPath = _PUBLICPATH + publicFileName
            item.createdBy = creator
            ChallengeItem.create(item, function (err, challengeItem) {
              console.error(err)
              if (err) handleError(res, err)
              challengeItems.push(challengeItem)
              callback()
            })
        })
      },function (err) {
        if(err) {
          console.log(err)
          return handleError(res, err)
        }else {
          challenge.challengeItems = challengeItems
          challenge.save(function(err) {
            if(err) { 
              console.error('challenge error:', err)
              return handleError(res, err)
            }
          })
          return res.status(200).json(challenge)
        }
      })
    })
  })  
}

// Updates an existing challenge in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Challenge.findById(req.params.id, function (err, challenge) {
    if (err) { return handleError(res, err); }
    if(!challenge) { return res.status(404).send('Not Found'); }
    var updated = _.merge(challenge, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(challenge);
    });
  });
};

// Deletes a challenge from the DB.
exports.destroy = function(req, res) {
  Challenge.findById(req.params.id, function (err, challenge) {
    if(err) { return handleError(res, err); }
    if(!challenge) { return res.status(404).send('Not Found'); }
    if (challenge.createdBy == req.user.id) {
      ChallengeItem.find({challengeId: challenge._id}, function (challenges) {
        challenges.remove(function (err) {
          if (err) return handleError(res, err)
          challenge.remove(function(err) {
            if(err) { return handleError(res, err) }
            return res.status(204).send('No Content')
          })
        })
      })
    }
  })
}

function handleError(res, err) {
  return res.status(500).send(err);
}