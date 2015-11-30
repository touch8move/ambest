'use strict';

var fs = require('fs')
var path = require('path')
var async = require('async')

var _ = require('lodash');
var Envy = require('./envy.model');
var EnvyItem = require('./envyItem.model');
var config = require('./../../config/environment');

// Get list of envys
exports.index = function(req, res) {
  Envy.find().populate('envyItems').exec(function (err, envys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(envys);
  });
};

// Get a single envy
exports.show = function(req, res) {
  Envy.findById(req.params.id)
  .populate('envyItems replys replys.createdBy likes').exec(function (err, envy) {
    if(err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    return res.json(envy);
  });
};

// Creates a new envy in the DB.
exports.create = function(req, res) {
  var _envy = {
    title:req.body.title
  }
  var _envyItems = []
  Envy.create(_envy, function(err, envy) {
    if(err) { return handleError(res, err); }
    var userAbsDir = path.resolve(config.imgDir, envy._id.toString())
    var userRelPath = path.join(config.imgDir, envy._id.toString())
    // console.log('userDir', userDir)
    fs.mkdir(userAbsDir, function (err) {
      if(err) {
        if (err.code != 'EEXIST') // ignore
          return handleError(res, err)
      }
      // mkdir success
      async.each(req.body.envyItems, function (item, cb) {
        // console.log(req.body.envyItems)
        var tmp = path.resolve(config.imgTmpDir, item.imgPath)
        var pub = path.resolve(userAbsDir, item.imgPath)
        fs.rename(
          tmp,
          pub,
          function (err) {
            // console.error(err)
            if (err) handleError(res, err)
            item.imgPath = path.join(userRelPath,item.imgPath)
            console.log(item)
            EnvyItem.create(item, function (err, eItem) {
              if(err) { 
                console.log(err)
                return handleError(res, err) 
              }
              console.log('eItem', eItem)
              _envyItems.push(eItem)
              cb()
            })
        })
      }, function (err) {
        if(err) return handleError(res, err)
        // console.log('envyItems', _envyItems)
        // console.log('before', _envy)
        _envy.envyItems = _envyItems
        // console.log('after', _envy)
        var updated = _.merge(envy, _envy)
        updated.save(function(err) {
          if(err) { return handleError(res, err); }
          return res.status(201).json(envy);
        })
      })
    })
  })
}

// Updates an existing envy in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Envy.findById(req.params.id, function (err, envy) {
    if (err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    var updated = _.merge(envy, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(envy);
    });
  });
};

// Deletes a envy from the DB.
exports.destroy = function(req, res) {
  Envy.findById(req.params.id, function (err, envy) {
    if(err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    envy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}