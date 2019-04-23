const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

const CONFIG = require('../../config').conf;

// 日志存放目录
const LOG_PATH = path.join(CONFIG.ROOT_PATH, CONFIG.LOG_PATH || 'logs');

const transports = [
  new winston.transports.DailyRotateFile({
    filename: path.join(LOG_PATH, 'error.%DATE%'),
    level: 'error',
    datePattern: 'YYYY-MM-DD',
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join(LOG_PATH, 'info.%DATE%'),
    level: 'info',
    datePattern: 'YYYY-MM-DD',
  }),
];

// 非生产环境输出控制台日志
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console());
}

// 格式自定义
const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`
);

// 按照传入的 filename 设置 label
module.exports = function getLogger(filename) {
  const labelName = filename
    ? path.relative(CONFIG.ROOT_PATH, filename)
    : 'default';
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.label({ label: labelName }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS(Z)',
      }),
      myFormat
    ),
    transports,
  });
  return logger;
};
