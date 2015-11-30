/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Elike = require('./elike.model');

exports.register = function(socket) {
  Elike.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Elike.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('elike:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('elike:remove', doc);
}