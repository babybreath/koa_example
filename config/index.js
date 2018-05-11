const path = require('path');

// 本地配置
const devConfig = require('./dev');

const ROOT_PATH = path.join(__dirname, '../');
exports.conf = {
  ROOT_PATH,
};

/**
 * 正式环境
 * @param callback
 */
function productionReady(callback) {
  // 这里可以远程获取服务配置然后设置conf
  // 也可以直接使用本地配置
  Object.assign(exports.conf, devConfig);
  callback(exports.conf);
}

/**
 * 研发环境
 * 一般直接获取本地配置
 * @param callback
 */
function developmentReady(callback) {
  Object.assign(exports.conf, devConfig);
  callback(exports.conf);
}

// 判断当前环境
if (process.env.NODE_ENV === 'production') {
  exports.ready = productionReady;
} else {
  exports.ready = developmentReady;
}
