import config from "config";
import logger from "../utils/logger";
import morgan from "morgan";
import {IncomingMessage, ServerResponse} from "http";

type Response = ServerResponse<IncomingMessage> & {
  locals: any;
};

morgan.token("message", (req, res: Response) => res.locals.errorMessage || "");

const getIpFormat = () => (config.get("mode") === "production" ? ":remote-addr - " : "");
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: {write: message => logger.info(message.trim())},
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {write: message => logger.error(message.trim())},
});

export default {successHandler, errorHandler};
