'use strict';

var express = require('express')
var controller = require('./like.controller')
var auth = require('../../auth/auth.service')
var router = express.Router()

router.get('/:id', controller.show)
router.get('/:id/isLike', auth.getUser(), controller.isLike)
router.post('/', auth.isAuthenticated(), controller.create)
router.put('/:id', auth.isAuthenticated(), controller.update)
router.patch('/:id', auth.isAuthenticated(), controller.update)
router.delete('/:id', auth.isAuthenticated(), controller.destroy)

module.exports = router