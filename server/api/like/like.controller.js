'use strict';

var _ = require('lodash');
var Like = require('./like.model');
var Envy = require('./../envy/envy.model')

exports.hasAuthorization = function (req, res, next) {
  if (req.like.createdBy.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    })
  }
}

exports.get = function (req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) return handleError(res, err)
    console.log(like)
    return res.status(200).json(like)
  })
}
// Get list of likes
exports.isLike = function(req, res) {
  Like.findOne({challengeId:req.params.id, createdBy:req.user.id}, function (err, like) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(like);
  });
};

exports.count = function (req, res) {
  Like.count({articleId:req.params.id}, function (err, count) {
    if(err) { return handleError(res, err) }
      return res.status(200).json({count: count})
  })
}

// Get a single like
exports.show = function (req, res) {
  Like.find({challengeId:req.params.id}, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.status(404).send('Not Found'); }
    return res.json(like);
  });
};

// Creates a new like in the DB.
exports.create = function (req, res) {
  var like = {
    challengeId: req.body.challengeId,
    createdBy: req.user
  }
  Like.create(like, function (err, like) {
    if(err) { return handleError(res, err); }
    like.createdBy = req.user.id
    return res.status(201).json(like);
  });
};

// Updates an existing like in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Like.findById(req.params.id, function (err, like) {
    if (err) { return handleError(res, err); }
    if(!like) { return res.status(404).send('Not Found'); }
    var updated = _.merge(like, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(like);
    });
  });
};
// Deletes a like from the DB.
exports.destroy = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.status(404).send('Not Found'); }
    console.log('like:', like.createdBy)
    console.log('user:', req.user.id)
    if (like.createdBy == req.user.id) {
      like.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      })
    } else {
      return res.status(403).send({message: 'User is not authorized'})
    }
  })
}
exports.like = function (req, res) {
  if(req.body.createdBy == req.user.id) {
    Envy.findById(req.params.id)
    .populate('likes')
    .exec(function (err, envy) {
      Like.create(req.body, function (err, like) {
        if(err) return handleError(res, err)
        envy.likes.push(like)
        envy.save(function (err) {
          if (err) return handleError(res, err)
          return res.status(200).json({'like':like})
        })
      })
    })
  } else {
    return res.status(403).send({message: 'User is not authorized'})
  }
}
function handleError(res, err) {
  return res.status(500).send(err);
}