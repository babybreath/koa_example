'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment');
const CONFIG = require('../../config');

const LOGSPATH = path.join(CONFIG.ROOT_PATH,'logs');
if(!fs.existsSync(LOGSPATH)){
    console.log('create log directory.');
    fs.mkdirSync(LOGSPATH);
}

const consoleOptions = {
    level: 'debug',
    colorize: 'all',
    timestamp: timestamp
};
const fileOptions = {
    level: 'info',
    filename: path.join(LOGSPATH, 'log'),
    timestamp: timestamp
};
const errorOptions = {
    level: 'error',
    filename: path.join(LOGSPATH, 'error.log'),
    timestamp: timestamp
};

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(consoleOptions),
        new winstonDailyRotateFile(fileOptions),
        new (winston.transports.File)(errorOptions)
    ]
});

function timestamp(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS(Z)');
}

module.exports = logger;
