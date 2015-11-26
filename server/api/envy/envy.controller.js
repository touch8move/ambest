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
  Envy.find(function (err, envys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(envys);
  });
};

// Get a single envy
exports.show = function(req, res) {
  Envy.findById(req.params.id, function (err, envy) {
    if(err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    return res.json(envy);
  });
};

// Creates a new envy in the DB.
exports.create = function(req, res) {
  var _envy = req.body
  var _envyItems = []
  async.each(_envyItems, function (item, cb) {
    EnvyItem.create(item, function (err, eItem) {
      if(err) { return handleError(res, err)}
      _envyItems.push(eItem)
      fs.rename(
        path.resolve(config.imgTmpDir, item.imgPath),
        path.resolve(config.imgDir, item.imgPath),
        function (err) {
          console.error(err)
          if (err) handleError(res, err)
          cb()
        })
    })
  }, function (err) {
    if(err) return handleError(res, err)
    console.log(_envy)
    _envy.envyItems = _envyItems
    Envy.create(_envy, function(err, envy) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(envy);
    });
  })
};

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