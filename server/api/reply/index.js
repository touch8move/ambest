'use strict'

var express = require('express')
var controller = require('./reply.controller')
var auth = require('../../auth/auth.service');
var router = express.Router()

router.get('/:id', controller.show)
router.get('/:id/count', controller.count)
router.post('/:type', auth.isAuthenticated(), controller.newrep)
// router.put('/:id', auth.isAuthenticated(), controller.update)
// router.patch('/:id', auth.isAuthenticated(), controller.update)
router.delete('/:id/:type', auth.isAuthenticated(), controller.delrep)
// router.delete('/:id', auth.isAuthenticated(), controller.destroy)


module.exports = router;