import { createLogger, transports, format } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

import { environment, logDirectory } from '../config/envConfigs';
let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!existsSync(dir)) {
  // Create the directory if it does not exist
  mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const dailyRotateFile = new DailyRotateFile({
  // @ts-ignore
  filename: dir + '/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export default createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  ),
  level: logLevel,
  handleExceptions: true,
  transports: [new transports.Console(), dailyRotateFile],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false, // do not exit on handled exceptions
});
