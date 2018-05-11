const ERROR_MSG = {};

function defineCode(code, msg) {
  ERROR_MSG[code] = msg;
  return code;
}

const ERROR_CODE = {
  SUCCESS: defineCode(200, '成功'),
  PARAMETER_ERROR: defineCode(400, '参数错误'),
  NO_AUTHORITY: defineCode(403, '操作无权限'),
  SERVER_BUSY: defineCode(500, '服务器繁忙，请稍后重试'),
  SERVER_ERROR: defineCode(503, '服务器错误'),
};

// 响应结果类
class Result {
  constructor(code, data) {
    this.meta = {
      code,
      message: ERROR_MSG[code],
    };
    this.setData(data);
  }

  setData(data) {
    if (typeof data !== 'undefined') {
      this.data = data;
    }
    return this;
  }

  setAttr(attr, value) {
    this[attr] = value;
    return this;
  }
}

module.exports = {
  ERROR_CODE,
  Result,
};
