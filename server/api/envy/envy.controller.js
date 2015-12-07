'use strict';

var fs = require('fs')
var path = require('path')
var async = require('async')

var _ = require('lodash');
var Envy = require('./envy.model');
var EnvyItem = require('./envyItem.model');
var Reply = require('./../reply/reply.model')
var config = require('./../../config/environment');

// Get list of envys
exports.index = function(req, res) {
  Envy.find().populate('envyItems').sort('-created_at').exec(function (err, envys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(envys);
  });
};

// Get a single envy
exports.show = function(req, res) {
  var populate = 'envyItems replys replys.createdBy'
  Envy.findById(req.params.id)
  // .populate('envyItems replys replys.createdBy')
  .deepPopulate(populate)
  // .populate({path:'likes', populate:{path:'createdBy'}})
  .exec(function (err, envy) {
    if(err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    return res.json(envy);
  });
};

// Creates a new envy in the DB.
exports.create = function(req, res) {
  var _envy = {
    title:req.body.title,
    createdBy: req.user
  }
  var _envyItems = []
  Envy.create(_envy, function(err, envy) {
    if(err) { return handleError(res, err); }
    var userAbsDir = path.resolve(config.imgDir, envy.createdBy._id.toString())
    var userRelPath = path.join(config.imgDir, envy.createdBy._id.toString(), envy._id.toString())
    console.log('userAbsDir', userAbsDir)
    fs.mkdir(userAbsDir, function (err) {
      if(err) {
        if (err.code != 'EEXIST') // ignore
          // console.log('error:', err)
          return handleError(res, err)
      }
      var imgPath = path.resolve(userAbsDir, envy._id.toString())
      fs.mkdir(imgPath, function (err) {
      // mkdir success
        if(err) {
          if (err.code != 'EEXIST') // ignore
            console.log('error:', err)
            return handleError(res, err)
        }
        async.each(req.body.envyItems, function (item, cb) {
          // console.log(req.body.envyItems)
          item.imgPath = userRelPath
          var tmp = path.resolve(config.imgTmpDir, item.fileName)
          var pub = path.resolve(item.imgPath, item.fileName)
          fs.rename(
            tmp,
            pub,
            function (err) {
              
              if (err) {
                console.error('error:', err)
                return handleError(res, err)
              }
              // console.log(item)
              EnvyItem.create(item, function (err, eItem) {
                if(err) { 
                  // console.log(err)
                  return handleError(res, err) 
                }
                // console.log('eItem', eItem)
                _envyItems.push(eItem)
                cb()
              })
          })
        }, function (err) {
          if(err) return handleError(res, err)
          // console.log('envyItems', _envyItems)
          // console.log('before', _envy)
          envy.envyItems = _envyItems
          // console.log('after', _envy)
          // var updated = _.merge(envy, _envy)
          envy.save(function(err) {
            if(err) { return handleError(res, err); }
            return res.status(201).json(envy);
          })
        })
      })
    })
  })
}

// Updates an existing envy in the DB.
exports.update = function(req, res) {
  // if(req.body._id) { delete req.body._id; }
  console.log(req.body)
  var envyItems = []
  var userRelPath = path.join(config.imgDir, req.body.createdBy.toString(), req.body._id.toString())
  Envy.findById(req.body._id, function (err, envy) {
    if (err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    if (req.user.id == envy.createdBy) {
      async.each(req.body.envyItems, function (item, cb) {
        // console.log(req.body.envyItems)
        EnvyItem.findById(item._id, function (err, envyItem) {
          if(envyItem) {
            if (envyItem.text != item.text)
              envyItem.text = item.text
            if (envyItem.fileName != item.fileName) {
              envyItem.fileName = item.fileName
              var tmp = path.resolve(config.imgTmpDir, item.fileName)
              var pub = path.resolve(envyItem.imgPath, item.fileName)
              fs.rename(
                tmp,
                pub,
                function (err) {
                  if (err) {
                    console.error('error:', err)
                    return handleError(res, err)
                  }

                  envyItem.save(function (err) {
                    if(err) return handleError(res, err) 
                    envyItems.push(envyItem)
                    cb()
                  })
              })
            } else {
              envyItem.save(function (err) {
                if(err) return handleError(res, err)
                envyItems.push(envyItem)
                cb()
              })
            }
          } else {
            item.imgPath = userRelPath
            var tmp = path.resolve(config.imgTmpDir, item.fileName)
            var pub = path.resolve(item.imgPath, item.fileName)
            fs.rename(
              tmp,
              pub,
              function (err) {
                
                if (err) {
                  console.error('error:', err)
                  return handleError(res, err)
                }
                // console.log(item)
                EnvyItem.create(item, function (err, eItem) {
                  if(err) { 
                    // console.log(err)
                    return handleError(res, err) 
                  }
                  // console.log('eItem', eItem)
                  envyItems.push(eItem)
                  cb()
                })
            })
          }
        })
      }, function (err) {
        if(err) return handleError(res, err)
        envy.title = req.body.title
        envy.envyItems = envyItems
        envy.save(function(err) {
          if(err) { return handleError(res, err); }
          return res.status(201).json(envy);
        })
      })
    } else {
      return res.status(403).send({message: 'You are not authorized'})
    }
  })
}

// Deletes a envy from the DB.
exports.destroy = function(req, res) {

  Envy.findById(req.params.id, function (err, envy) {
    if(err) { return handleError(res, err); }
    if(!envy) { return res.status(404).send('Not Found'); }
    if (req.user.id == envy.createdBy) {
      envy.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    } else {
      return res.status(403).send({message: 'You are not authorized'})
    }
  });
};
exports.repSave = function (req, res) {
  Envy.findById(req.body.envyId)
  .populate('envyItems replys replys.createdBy likes').exec(function (err, envy) {
    if(err) return handleError(res, err)
    if(!envy) return res.status(404).send('Not Found')
    var creator = req.user
    // console.log(creator)
    var insert = {
      createdBy: creator,
      text: req.body.reply.text
    }
    Reply.create(insert, function (err, reply) {
      envy.replys.push(reply)
      envy.save(function (err) {
        if(err) return handleError(res, err)
          // console.log(envy)
        return res.status(200).json(reply)
      })
    })

  })
}

// exports.replyDel = function (req, res) {
//   // var populate = 'envyItems replys replys.createdBy'
//   // del envy rep
//   if (req.params.type != 'rep') {
//     return res.status(400).send('wrong access')
//   }
//   Reply.findById(req.params.repId, function (err, rep) {
//     rep.remove( function (err) {
//       if(err) return handleError(res, err)
//       Envy.findById(req.params.id)
//       // .deepPopulate(populate)
//       .exec(function (err, envy) {
//         if(err) return handleError(res, err)
//         if(!envy) return res.status(404).send('Envy Not Found')
//           console.log('found', envy )
//         envy.update({$pull:{replys:{_id:req.body.repId}}}, function (err, rep) {
//           if (err) return handleError(res, err)
//           return res.status(200).send('rep del success')
//         })
//       })
//     })
//   })
// }
function handleError(res, err) {
  console.log(err)
  return res.status(500).send(err);
}