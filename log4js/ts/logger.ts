// Require Log4js
import log4js from "log4js";

// Logger configuration
log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "server.log" }, // <----- double check the path
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "console"], level: "error" },
  },
});

// Create the logger
const logger = log4js.getLogger();


export default logger;
