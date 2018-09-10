
function AppError(message, name, data) {
  this.name = name;
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
  this.data = data;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

window.AppError = AppError;
