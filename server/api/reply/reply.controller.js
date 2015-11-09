'use strict';

var _ = require('lodash')
var User = require('./../user/user.model')
var Reply = require('./reply.model')
var Article = require('./../article/article.model')

// Get list of replys
exports.index = function(req, res) {
	Reply.find(function (err, replys) {
		if(err) { return handleError(res, err); }
		return res.status(200).json(replys);
	});
};

exports.show = function(req, res) {
	
	Reply.find({articleId:req.params.id}).populate('createdBy').exec(function (err, replys) {
		if(err) { return handleError(res, err); }
		if(!replys) { return res.status(404).send('Not Found'); }
		return res.status(200).json(replys);
	})
}

exports.count = function (req, res) {
	Reply.count({articleId:req.params.id}, function (err, count) {
		if (err) { return handleError(res, err) }
		return res.status(200).json({count: count})
	})
}

// Creates a new reply in the DB.
exports.create = function(req, res) {
	var creator = req.user
	var insert = {
		articleId: req.body.articleId,
		createdBy: creator,
		content: req.body.content,
	}
	Reply.create(insert, function(err, reply) {
		if(err) { return handleError(res, err); }
		return res.status(201).json(reply);
	})
};

// Updates an existing reply in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Reply.findById(req.params.id, function (err, reply) {
		if (err) { return handleError(res, err); }
		if(!reply) { return res.status(404).send('Not Found'); }
		var updated = _.merge(reply, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.status(200).json(reply);
		});
	});
};

// Deletes a reply from the DB.
exports.destroy = function(req, res) {
	Reply.findById(req.params.id, function (err, reply) {
		if(err) { return handleError(res, err); }
		if(!reply) { return res.status(404).send('Not Found'); }
		if (reply.createdBy == req.user.id) {
			reply.remove(function(err) {
				if(err) { return handleError(res, err); }
				return res.status(204).send('No Content');
			})
		} else {
			return res.status(403).send({message: 'User is not authorized'})
		}
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}