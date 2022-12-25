import config from "config";
import express from "express";
import compression from "compression";
import bluebird from "bluebird";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import morgan from "./config/morgan";
import {errorConverter, errorHandler} from "./middleware/error";
import router from "./routes";

const app = express();

if (config.get("mode") !== "development") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security headers
app.use(helmet());

// gzip compression
app.use(compression());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// enable cors
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello world").status(200);
});

app.use("/v1", router);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
