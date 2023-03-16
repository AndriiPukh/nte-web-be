const winston = require('winston');
const { env } = require('../configs/server');

const customLevels = {
  levels: {
    trace: 6,
    debug: 5,
    info: 2,
    http: 3,
    warn: 4,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    http: 'magenta',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

class Logger {
  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transport = new winston.transports.Console({
      format: formatter,
    });
    this.logger = winston.createLogger({
      level: env === 'development' ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [
        env === 'development' ? transport : prodTransport,
        new winston.transports.File({ filename: 'logs/all.log' }),
      ],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg, meta) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg, meta) {
    this.logger.debug(msg, meta);
  }

  info(msg, meta) {
    this.logger.info(msg, meta);
  }

  warn(msg, meta) {
    this.logger.warn(msg, meta);
  }

  error(msg, meta) {
    this.logger.error(msg, meta);
  }

  fatal(msg, meta) {
    this.logger.log('fatal', msg, meta);
  }

  http(msg, meta) {
    this.logger.http(msg, meta);
  }
}

module.exports = new Logger();
