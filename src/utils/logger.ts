import winston from "winston";
import config from "config";

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) {
    Object.assign(info, {message: info.stack});
  }
  return info;
});

const logger = winston.createLogger({
  level: config.get("mode") === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.get("mode") === "development" ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({level, message}) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
