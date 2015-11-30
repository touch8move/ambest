/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var express = require('express')
module.exports = function(app) {

  // Insert routes below
  app.use('/api/envy/elikes', require('./api/elike'));
  app.use('/api/envy/ereply', require('./api/ereply'));
  app.use('/api/envys', require('./api/envy'));
  app.use('/api/cardinfos', require('./api/cardinfo'));
  app.use('/api/likes', require('./api/like'));
  app.use('/api/articles', require('./api/article'));
  app.use('/auth', require('./auth'));
  app.use('/api/replys', require('./api/reply'));
  app.use('/api/challenges', require('./api/challenge'));
  app.use('/api/files', require('./api/file'));
  app.use('/api/users', require('./api/user'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
