/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var express = require('express')
module.exports = function(app) {

  // Insert routes below
  app.use('/api/files', require('./api/file'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/threadss', require('./api/threads'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  app.use('/public', express.static(__dirname + '/../public'))
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
