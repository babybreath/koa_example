const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('./lib/util/logger')(__filename);
const errorHandler = require('./lib/util/errorHandler');
const router = require('./lib/router');
const CONFIG = require('./config').conf;

app.name = CONFIG.PROJECT_NAME;
logger.info('run ' + app.name);

if (CONFIG.STATIC_PATH) {
  const staticPath = path.join(conf.ROOT_PATH, conf.STATIC_PATH);
  logger.info(`静态资源目录 => {staticPath}`);
  // 自定义 koa-static 配置
  app.use(koaStatic(staticPath));
}

app.use(errorHandler());

// 参数parse处理
app.use(bodyParser());

// 路由处理
app.use(router.routes()).use(router.allowedMethods());

// default
app.use(async (ctx, next) => {
  logger.info(`${ctx.path} 未找到`);
  ctx.status = 200;
  ctx.body = 'Not found.';
});

// 错误处理
app.on('error', function(err, ctx) {
  logger.error(err);
});

module.exports = app;
