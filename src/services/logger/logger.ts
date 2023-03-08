import log from 'loglevel';

log.setDefaultLevel('trace');

const trace = (...msg: any[]) => {
  log.trace(...msg);
};

const debug = (...msg: any[]) => {
  log.debug(...msg);
};

const info = (...msg: any[]) => {
  log.info(...msg);
};

const warn = (...msg: any[]) => {
  log.warn(...msg);
};

const error = (...msg: any[]) => {
  log.error(...msg);
};

const logger = {
  trace,
  debug,
  info,
  warn,
  error,
};

export default logger;
