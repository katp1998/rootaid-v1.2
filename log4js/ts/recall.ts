// this demonstrated how logger should be imported and used accross other files:

import logger from './logger';

// Logging messages for different levels:
logger.trace("Trace level");
logger.debug("Debug level");
logger.info("info level");
logger.warn("warning level");
logger.error("error level");
logger.fatal("fatal level");