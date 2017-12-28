export default function SimpleError(errorMessage, errorCode) {
  this.name = 'ValidationError';
  this.message = errorMessage || 'Ha ocurrido un error';
  this.stack = (new Error()).stack;
  this.code = errorCode || 500;
}

SimpleError.prototype = Object.create(Error.prototype);
SimpleError.prototype.constructor = SimpleError;
