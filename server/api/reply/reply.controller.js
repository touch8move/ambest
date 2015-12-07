'use strict';

var _ = require('lodash')
var User = require('./../user/user.model')
var Reply = require('./reply.model')
var Article = require('./../article/article.model')
var Envy = require('./../envy/envy.model')

// Get list of replys
exports.index = function(req, res) {
  Reply.find(function (err, replys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(replys);
  });
};

exports.show = function(req, res) {
  
  Reply.find({articleId:req.params.id}).populate('createdBy').exec(function (err, replys) {
    if(err) { return handleError(res, err); }
    if(!replys) { return res.status(404).send('Not Found'); }
    return res.status(200).json(replys);
  })
}

exports.count = function (req, res) {
  Reply.count({articleId:req.params.id}, function (err, count) {
    if (err) { return handleError(res, err) }
    return res.status(200).json({count: count})
  })
}

// Creates a new reply in the DB.
exports.create = function(req, res) {
  var creator = req.user
  var insert = {
    articleId: req.body.articleId,
    createdBy: creator,
    content: req.body.content,
  }
  Reply.create(insert, function(err, reply) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(reply);
  })
};

exports.newrep = function (req, res) {
  if (req.params.type=='envy') {
    Envy.findById(req.body.envyId)
    .populate('envyItems replys replys.createdBy likes').exec(function (err, envy) {
      if(err) return handleError(res, err)
      if(!envy) return res.status(404).send('Not Found')
      var creator = req.user
      // console.log(creator)
      var insert = {
        createdBy: creator,
        text: req.body.reply
      }
      Reply.create(insert, function (err, reply) {
        envy.replys.push(reply)
        envy.save(function (err) {
          if(err) return handleError(res, err)
            // console.log(envy)
          return res.status(200).json(reply)
        })
      })
    })
  } else {
    return res.status(403).send('wrong access')
  }
}

// Updates an existing reply in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reply.findById(req.params.id, function (err, reply) {
    if (err) { return handleError(res, err); }
    if(!reply) { return res.status(404).send('Not Found'); }
    var updated = _.merge(reply, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(reply);
    });
  });
};

// Deletes a reply from the DB.
exports.destroy = function(req, res) {
  Reply.findById(req.params.id, function (err, reply) {
    if(err) { return handleError(res, err); }
    if(!reply) { return res.status(404).send('Not Found'); }
    if (reply.createdBy == req.user.id) {
      reply.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      })
    } else {
      return res.status(403).send({message: 'You are not authorized'})
    }
  });
};

exports.delrep = function (req, res) {
  console.log('delete reply')
  if (req.params.type == 'envy') {
    Reply.findById(req.params.id, function (err, rep) {
      if (err) return handleError(res, err)
      if (!rep) return res.status(404).send('Rep Not Found')
      if (req.user.id != rep.createdBy) return res.status(403).send({message: 'User is not authorized'})

      rep.remove( function (err) {
        if(err) return handleError(res, err)
        Envy.findOne({replys:{_id:req.params.id}})
        // .deepPopulate(populate)
        .exec(function (err, envy) {
        if(err) return handleError(res, err)
        if(!envy) return res.status(404).send('Envy Not Found')
          console.log('found', envy )
        envy.update({$pull:{replys:{_id:req.body.repId}}}, function (err, rep) {
          if (err) return handleError(res, err)
          return res.status(200).send('rep del success')
        })
        })
      })
    })
  } else if(req.params.type == 'challenge') {

  } else {
    return res.status(403).send('wrong access')
  }
}

function handleError(res, err) {
  return res.status(500).send(err);
}