// 通用错误处理
const { Result, ERROR_CODE } = require('./Result');
const logger = require('./logger')(__filename);

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.warn(e);
    ctx.body = new Result(ERROR_CODE.SERVER_ERROR);
  }
};
