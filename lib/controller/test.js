const testService = require('../service/test');
const { ERROR_CODE, Result } = require('../util/Result');

exports.test = async function test(ctx) {
  const result = await testService.test();
  ctx.body = new Result(ERROR_CODE.SUCCESS, result);
};
