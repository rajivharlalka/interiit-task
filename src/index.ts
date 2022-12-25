// set config's directory to be src/config
process.env.NODE_CONFIG_DIR = "./src/config";
import config from "config";
import app from "./app";
import logger from "./utils/logger";

const server = app.listen(config.get("port"), () => {
  logger.info("App is running at http://localhost:%d in %s mode", config.get("port"), config.get("mode"));
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export default server;
