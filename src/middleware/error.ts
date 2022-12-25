import config from "config";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import logger from "../utils/logger";

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let {statusCode, message} = err;
  if (config.get("mode") === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.get("mode") === "development" && {stack: err.stack}),
  };

  if (config.get("mode") === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export {errorConverter, errorHandler};
