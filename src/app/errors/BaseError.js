class BaseError extends Error {
  constructor(name, description, httpCode, isOperational) {
    console.log(httpCode, 'Actions log<<<<<');
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode || 500;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
