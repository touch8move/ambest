/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Threads = require('./threads.model');

exports.register = function(socket) {
  Threads.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Threads.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('threads:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('threads:remove', doc);
}