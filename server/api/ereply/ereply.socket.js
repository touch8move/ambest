/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ereply = require('./ereply.model');

exports.register = function(socket) {
  Ereply.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ereply.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ereply:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ereply:remove', doc);
}