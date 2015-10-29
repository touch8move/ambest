'use strict';
process.env.TMPDIR = 'tmp';
var fs = require('fs');
var flow = require('./flow.node')('tmp');

var _ = require('lodash');
var File = require('./file.model');

var ACCESS_CONTROLL_ALLOW_ORIGIN = false;


// Get list of files
exports.index = function(req, res) {
  File.find(function (err, files) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(files);
  });
};

// Get a single file
exports.show = function(req, res) {
  File.findById(req.params.id, function (err, file) {
    if(err) { return handleError(res, err); }
    if(!file) { return res.status(404).send('Not Found'); }
    return res.json(file);
  });
};

// Creates a new file in the DB.
exports.create = function(req, res) {
  File.create(req.body, function(err, file) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(file);
  });
};

// Updates an existing file in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  File.findById(req.params.id, function (err, file) {
    if (err) { return handleError(res, err); }
    if(!file) { return res.status(404).send('Not Found'); }
    var updated = _.merge(file, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(file);
    });
  });
};

// Deletes a file from the DB.
exports.destroy = function(req, res) {
  File.findById(req.params.id, function (err, file) {
    if(err) { return handleError(res, err); }
    if(!file) { return res.status(404).send('Not Found'); }
    file.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.upload = function (req, res, next) {
  console.log('exports.upload', req.body)
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET', status);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      if (status == 'found') {
        status = 200;
      } else {
        status = 204;
      }

      res.status(status).send(filename);
    });
};

exports.uploadPost = function (req, res) {
  console.log('exports.uploadPost', req.body)
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    res.status(status).send(filename);
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}