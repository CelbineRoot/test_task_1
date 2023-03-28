export enum ErrorStatus {
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  notAcceptable = 406,
  conflict = 409,
  preconditionFailed = 412,
  unsupportedMediaType = 415,
  tooManyRequests = 429,
  internalServerError = 500,
}

export const validErrorStatus = [
  ErrorStatus.badRequest,
  ErrorStatus.unauthorized,
  ErrorStatus.notFound,
  ErrorStatus.notAcceptable,
  ErrorStatus.conflict,
  ErrorStatus.preconditionFailed,
  ErrorStatus.unsupportedMediaType,
  ErrorStatus.tooManyRequests,
  ErrorStatus.internalServerError,
];
