'use strict';

var _ = require('lodash');
var Envy = require('./envy.model');

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
  Envy.create(req.body, function(err, envy) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(envy);
  });
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