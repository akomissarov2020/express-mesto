const winston = require('winston');
const expressWinston = require('express-winston');

const currentDir = process.cwd();

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: '${currentDir}/../../request.log' }),
    new winston.transports.Console(),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: '${currentDir}/../../error.log' }),
    new winston.transports.Console(),
  ],
  format: winston.format.json(),
});