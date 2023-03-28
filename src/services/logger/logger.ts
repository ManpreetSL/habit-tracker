import log from 'loglevel';

const defaultLevel = process.env.NODE_ENV === 'production' ? 'info' : 'trace';
log.setDefaultLevel(defaultLevel);

const logger = {
  trace: log.trace,
  debug: log.debug,
  info: log.info,
  warn: log.warn,
  error: log.error,
};

export default logger;
