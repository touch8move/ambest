'use strict';

var _ = require('lodash');
var Elike = require('./elike.model');

// Get list of elikes
exports.index = function(req, res) {
  Elike.find(function (err, elikes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(elikes);
  });
};

// Get a single elike
exports.show = function(req, res) {
  Elike.findById(req.params.id, function (err, elike) {
    if(err) { return handleError(res, err); }
    if(!elike) { return res.status(404).send('Not Found'); }
    return res.json(elike);
  });
};

// Creates a new elike in the DB.
exports.create = function(req, res) {
  Elike.create(req.body, function(err, elike) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(elike);
  });
};

// Updates an existing elike in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Elike.findById(req.params.id, function (err, elike) {
    if (err) { return handleError(res, err); }
    if(!elike) { return res.status(404).send('Not Found'); }
    var updated = _.merge(elike, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(elike);
    });
  });
};

// Deletes a elike from the DB.
exports.destroy = function(req, res) {
  Elike.findById(req.params.id, function (err, elike) {
    if(err) { return handleError(res, err); }
    if(!elike) { return res.status(404).send('Not Found'); }
    elike.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}