interface ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  stack?: string;
}

class ApiError extends Error implements ApiError {
  constructor(statusCode: number, message: string, isOperational = true, stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
