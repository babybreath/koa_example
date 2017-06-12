'use strict';

const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('./lib/util/log');
const router = require('./lib/router');
const CONFIG = require('./config');

app.name = CONFIG.PROJECT_NAME;
logger.info('run ' + app.name);

// 静态文件处理
app.use(koaStatic(CONFIG.PUBLIC_PATH));

// 参数parse处理
app.use(bodyParser());

// 路由处理
app.use(router.routes())
    .use(router.allowedMethods());

// default
app.use(async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Not found.';
});

// 错误处理
app.on('error', function(err, ctx){
    logger.error(err);
});

module.exports = app;