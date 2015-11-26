/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Envy = require('./envy.model');

exports.register = function(socket) {
  Envy.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Envy.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('envy:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('envy:remove', doc);
}