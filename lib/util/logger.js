'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment');
const CONFIG = require('../../config').conf;

// 日志存放目录
const LOG_PATH = path.join(CONFIG.ROOT_PATH, CONFIG.LOG_PATH || 'log');

// 时间输出格式
function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS(Z)');
}

// 控制台输出日志配置
const consoleOptions = {
  level: 'debug',
  colorize: 'all',
  timestamp: timestamp,
};

// 文件输出日志配置
// 可以修改输出日志级别
const fileOptions = {
  level: 'debug',
  filename: path.join(LOG_PATH, 'info'),
  timestamp: timestamp,
};

winston.loggers.options.transports = [
  new winston.transports.Console(consoleOptions),
];

// 如果是正式环境，增加文件日志输出
if (process.env.NODE_ENV === 'production') {
  // 如果日志存放目录不存在则创建此目录
  if (!fs.existsSync(LOG_PATH)) {
    console.log('create log directory.');
    fs.mkdirSync(LOG_PATH);
  }
  winston.loggers.options.transports.push(
    new winstonDailyRotateFile(fileOptions)
  );
}

winston.loggers.add('default').filters.push(function(level, msg, meta) {
  return '[default] ' + msg;
});

// 如果已存在 name 名称的logger 返回此logger
// 如果不存在 name 名称的logger 创建label为 name 名称logger 返回此logger
// 使用方法：const logger = require(本文件路径)(__filename)  名称可自定义
module.exports = function(filename) {
  if (!filename) {
    return winston.loggers.get('default');
  }
  let name = path.relative(CONFIG.ROOT_PATH, filename);
  if (!winston.loggers.has(name)) {
    winston.loggers.add(name).filters.push(function(level, msg, meta) {
      return '[' + name + '] ' + msg;
    });
  }
  return winston.loggers.get(name);
};
