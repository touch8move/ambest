'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util')

var _ = require('lodash')
var Article = require('./article.model')
var Challenge = require('./../challenge/challenge.model')

var _PUBLICPATH = 'public/'
var tmpFilePath = path.resolve('tmp/')
var publicFilePath = path.resolve(_PUBLICPATH)

// Get list of articles
exports.index = function(req, res) {
  Article.find().populate('challenge', 'reply').sort('-createdDate').exec(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  var _article = {
    title: req.body.title,
    imgPath: req.body.imgPath,
    content: req.body.content,
    createdBy: req.user,
  }
  Article.create(_article, function(err, article) {
    if(err) { return handleError(res, err); }
    var publicFileName = article.id + article.imgPath
    var newArticle = article
    console.log('publicFileName', publicFileName)
    console.log('old', path.resolve(tmpFilePath, article.imgPath))
    console.log('new', path.resolve(_PUBLICPATH, './' + publicFileName))
    fs.rename(
      path.resolve(tmpFilePath, article.imgPath), 
      path.resolve(_PUBLICPATH, './' + publicFileName), 
      function(err) {
        if(err) { 
          return handleError(res, err) 
        }
        newArticle.imgPath = _PUBLICPATH + publicFileName
        var updated = _.merge(article, newArticle)
        updated.save(function (err) {
          if (err) return handleError(res, err)
          return res.status(201).json(article)
        })
      }
    )
    // return res.status(201).json(article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    var publicFileName = article.id + article.imgPath
    var newArticle = article
    console.log('publicFileName', publicFileName)
    console.log('old', path.resolve(tmpFilePath, article.imgPath))
    console.log('new', path.resolve(_PUBLICPATH, './' + publicFileName))
    fs.rename(
      path.resolve(tmpFilePath, article.imgPath), 
      path.resolve(_PUBLICPATH, './' + publicFileName), 
      function(err) {
        if(err) { 
          return handleError(res, err) 
        }
        newArticle.imgPath = _PUBLICPATH + publicFileName
        var updated = _.merge(article, newArticle)
        updated.save(function (err) {
          if (err) return handleError(res, err)
          return res.status(201).json(article)
        })
      }
    )
  })
}

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  var delFilePath = null
  Article.findById(req.params.id, function (err, article) {
    delFilePath = article.imgPath
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    Challenge.count({articleId:article._id}, function (err, count) {
      if (count == 0) {
        if (article.createdBy == req.user.id) {
          article.remove(function(err) {
            if(err) { return handleError(res, err); }
            fs.unlink(delFilePath, function (err) {
              if(err) return handleError(res, err)
              return res.status(204).send('No Content');
            })
          })
        }
      }
    })
  })
}

function handleError(res, err) {
  return res.status(500).send(err);
}