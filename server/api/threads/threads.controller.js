'use strict';

var _ = require('lodash');
var Threads = require('./threads.model');

// Get list of threadss
exports.index = function(req, res) {
  Threads.find(function (err, threadss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(threadss);
  });
};

// Get a single threads
exports.show = function(req, res) {
  Threads.findById(req.params.id, function (err, threads) {
    if(err) { return handleError(res, err); }
    if(!threads) { return res.status(404).send('Not Found'); }
    return res.json(threads);
  });
};

// Creates a new threads in the DB.
exports.create = function(req, res) {
  Threads.create(req.body, function(err, threads) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(threads);
  });
};

// Updates an existing threads in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Threads.findById(req.params.id, function (err, threads) {
    if (err) { return handleError(res, err); }
    if(!threads) { return res.status(404).send('Not Found'); }
    var updated = _.merge(threads, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(threads);
    });
  });
};

// Deletes a threads from the DB.
exports.destroy = function(req, res) {
  Threads.findById(req.params.id, function (err, threads) {
    if(err) { return handleError(res, err); }
    if(!threads) { return res.status(404).send('Not Found'); }
    threads.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}