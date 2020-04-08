const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const logger = require('./lib/util/logger')(__filename);
const errorHandler = require('./lib/util/errorHandler');
const router = require('./lib/router');
const CONFIG = require('./config').conf;

const app = new Koa();

logger.info(`NODE_ENV => ${process.env.NODE_ENV || 'development'}`);

if (CONFIG.STATIC_PATH) {
  const staticPath = path.join(CONFIG.ROOT_PATH, CONFIG.STATIC_PATH);
  logger.info(`静态资源目录 => ${staticPath}`);
  // 自定义 koa-static 配置
  app.use(koaStatic(staticPath));
}

app.use(errorHandler());

// 参数parse处理
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    },
    includeUnparsed: true,
  })
);

// 路由处理
app.use(router.routes()).use(router.allowedMethods());

// default
app.use(async (ctx) => {
  logger.info(`${ctx.path} 未找到`);
  ctx.status = 404;
  ctx.body = 'Not found.';
});

// 错误处理
app.on('error', (err) => {
  logger.error(err);
});

module.exports = app;
