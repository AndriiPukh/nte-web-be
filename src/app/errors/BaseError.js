class BaseError extends Error {
  constructor(name, description, httpCode, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
