'use strict';

const Router = require('koa-router');
const test = require('../controller/test');

const router = new Router();

router.all('/test', test.test);

module.exports = router;
