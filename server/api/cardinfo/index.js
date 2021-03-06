'use strict';

var express = require('express');
var controller = require('./cardinfo.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:type', controller.list)
// router.get('/:id', controller.show);

module.exports = router;