/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cardinfo = require('./cardinfo.model');

exports.register = function(socket) {
  Cardinfo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cardinfo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cardinfo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cardinfo:remove', doc);
}