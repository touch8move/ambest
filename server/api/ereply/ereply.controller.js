'use strict';

var _ = require('lodash');
var Ereply = require('./ereply.model');

// Get list of ereplys
exports.index = function(req, res) {
  Ereply.find(function (err, ereplys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ereplys);
  });
};

// Get a single ereply
exports.show = function(req, res) {
  Ereply.findById(req.params.id, function (err, ereply) {
    if(err) { return handleError(res, err); }
    if(!ereply) { return res.status(404).send('Not Found'); }
    return res.json(ereply);
  });
};

// Creates a new ereply in the DB.
exports.create = function(req, res) {
  Ereply.create(req.body, function(err, ereply) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ereply);
  });
};

// Updates an existing ereply in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ereply.findById(req.params.id, function (err, ereply) {
    if (err) { return handleError(res, err); }
    if(!ereply) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ereply, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ereply);
    });
  });
};

// Deletes a ereply from the DB.
exports.destroy = function(req, res) {
  Ereply.findById(req.params.id, function (err, ereply) {
    if(err) { return handleError(res, err); }
    if(!ereply) { return res.status(404).send('Not Found'); }
    ereply.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}