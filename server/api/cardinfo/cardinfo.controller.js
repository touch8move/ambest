'use strict';
var async = require('async')
var each = require('async-each-series')
var _ = require('lodash');
var Article = require('./../article/article.model')
var Challenge = require('./../challenge/challenge.model')
var Like = require('./../like/like.model')
var Reply = require('./../reply/reply.model')

// Get list of cardinfos
exports.index = function(req, res) {
	var cardInfos = []
	
	Article.find().sort('-createdDate').exec(function (err, articles) {
		if(err) { return handleError(res, err); }
		// console.log(articles)
		each(articles, function (article, cb) {
			var cdInfo = {
				article: article,
				likesCnt : 0,
				replysCnt : 0,
				challengesCnt : 0
			}
			async.parallel([
				function (callback) {
					Challenge.count({articleId:article._id}, function (err, challengeCount) {
						cdInfo.challengesCnt = challengeCount
						callback()
					})
				}, function (callback) {
					Like.count({articleId:article._id}, function (err, likeCnt) {
						cdInfo.likesCnt = likeCnt
						callback()
					})

				}, function (callback) {
					Reply.count({articleId:article._id}, function (err, replyCnt) {
						cdInfo.replysCnt = replyCnt
						callback()
					})

				}
				], function (err, results) {
					if (err) return handleError(res, err)
					cardInfos.push(cdInfo)
					cb()
				})
		}, function (err) {
			if (err) {
				console.log(err)
				return handleError(res, err)
			}
			return res.status(200).json(cardInfos)
		})
	})
}
exports.list = function (req, res) {
	var cardInfos = []
	if (req.params.type == 'hot') {
		
		Article.find().sort('-createdDate').exec(function (err, articles) {
			if(err) { return handleError(res, err); }
			console.log(articles)
			each(articles, function (article, cb) {
				var cdInfo = {
					article: article,
					likesCnt : 0,
					replysCnt : 0,
					challengesCnt : 0
				}
				async.parallel([
					function (callback) {
						Challenge.count({articleId:article._id}, function (err, challengeCount) {
							cdInfo.challengesCnt = challengeCount
							callback()
						})
					}, function (callback) {
						Like.count({articleId:article._id}, function (err, likeCnt) {
							cdInfo.likesCnt = likeCnt
							callback()
						})

					}, function (callback) {
						Reply.count({articleId:article._id}, function (err, replyCnt) {
							cdInfo.replysCnt = replyCnt
							callback()
						})

					}
					], function (err, results) {
						if (err) return handleError(res, err)
						cardInfos.push(cdInfo)
						cb()
					})
			}, function (err) {
				if (err) {
					console.log(err)
					return handleError(res, err)
				}
				return res.status(200).json(cardInfos)
			})
		})
	} else if ( req.params.type == 'fav') {
		// var cardInfos = []
	
		Article.find().sort('-createdDate').exec(function (err, articles) {
			if(err) { return handleError(res, err); }
			console.log(articles)
			each(articles, function (article, cb) {
				var cdInfo = {
					article: article,
					likesCnt : 0,
					replysCnt : 0,
					challengesCnt : 0
				}
				async.parallel([
					function (callback) {
						Challenge.count({articleId:article._id}, function (err, challengeCount) {
							cdInfo.challengesCnt = challengeCount
							callback()
						})
					}, function (callback) {
						Like.count({articleId:article._id}, function (err, likeCnt) {
							cdInfo.likesCnt = likeCnt
							callback()
						})

					}, function (callback) {
						Reply.count({articleId:article._id}, function (err, replyCnt) {
							cdInfo.replysCnt = replyCnt
							callback()
						})

					}
					], function (err, results) {
						if (err) return handleError(res, err)
						cardInfos.push(cdInfo)
						cb()
					})
			}, function (err) {
				if (err) {
					console.log(err)
					return handleError(res, err)
				}
				return res.status(200).json(cardInfos)
			})
		})
	} else {
		Article.find().sort('-createdDate').exec(function (err, articles) {
			if(err) { return handleError(res, err); }
			console.log(articles)
			each(articles, function (article, cb) {
				var cdInfo = {
					article: article,
					likesCnt : 0,
					replysCnt : 0,
					challengesCnt : 0
				}
				async.parallel([
					function (callback) {
						Challenge.count({articleId:article._id}, function (err, challengeCount) {
							cdInfo.challengesCnt = challengeCount
							callback()
						})
					}, function (callback) {
						Like.count({articleId:article._id}, function (err, likeCnt) {
							cdInfo.likesCnt = likeCnt
							callback()
						})

					}, function (callback) {
						Reply.count({articleId:article._id}, function (err, replyCnt) {
							cdInfo.replysCnt = replyCnt
							callback()
						})

					}
					], function (err, results) {
						if (err) return handleError(res, err)
						cardInfos.push(cdInfo)
						cb()
					})
			}, function (err) {
				if (err) {
					console.log(err)
					return handleError(res, err)
				}
				return res.status(200).json(cardInfos)
			})
		})
	}
}
// Get a single cardinfo
exports.show = function(req, res) {
	Cardinfo.findById(req.params.id, function (err, cardinfo) {
		if(err) { return handleError(res, err); }
		if(!cardinfo) { return res.status(404).send('Not Found'); }
		return res.json(cardinfo);
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}