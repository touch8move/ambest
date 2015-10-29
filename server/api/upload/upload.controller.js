'use strict';
var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    async = require('async')
var _ = require('lodash');
var Upload = require('./upload.model');
var _PUBLICPATH = 'public/'

var tmpFilePath = path.resolve('tmp/')
var publicFilePath = path.resolve(_PUBLICPATH)

// Get list of uploads
exports.index = function(req, res) {
  Upload.find(function (err, uploads) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(uploads);
  });
};

// Get a single upload
exports.show = function(req, res) {
  console.log('GET', 'params', req.params)
  Upload.findById(req.params.id, function (err, upload) {
    if(err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    return res.json(upload);
  });
};

// Creates a new upload in the DB.
exports.create = function(req, res) {
  // console.log('init', req.body.tmpFileName)
  Upload.create(req.body, function(err, upload) {
    if(err) { return handleError(res, err); }
    
    Upload.findById(upload._id, function (err, upload) {
      // console.log('upload:', upload)
      if (err) { return handleError(res, err); }
      if(!upload) { return res.status(404).send('Not Found'); }
      var newUpload = upload
      var newItems=[]


      async.each(req.body.items, function(item, callback) {
        var publicFileName = upload._id + item.tmpFileName
        // console.log('item.imgFilePath', item.tmpFileName)
        fs.rename(
          path.resolve(tmpFilePath, item.tmpFileName), 
          path.resolve(_PUBLICPATH, './' + publicFileName), 
          function(err) {
            if(err) { 
              callback(err)
              return handlerError(res, err) 
            }
            newItems.push({imgFilePath:_PUBLICPATH + publicFileName, content:item.content})
            callback()
        })
      },function (err) {
        if(err) {
          console.log(err)
        }else {
          newUpload.items = newItems
          var updated = _.merge(upload, newUpload);
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(upload);
          });
        }
      })

    })
  })
}

// Updates an existing upload in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Upload.findById(req.params.id, function (err, upload) {
    if (err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    var updated = _.merge(upload, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(upload);
    });
  });
};

// Deletes a upload from the DB.
exports.destroy = function(req, res) {
  Upload.findById(req.params.id, function (err, upload) {
    if(err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    upload.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}