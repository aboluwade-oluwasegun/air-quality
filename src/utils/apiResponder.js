import httpStatus from 'http-status';
import ApiError from './ApiError';

const ApiResponder = (res, statusCode, payload) => {
  console.log(`"response api: "${JSON.stringify(payload)}`);
  res.status(statusCode).send(payload);
};

const successResponse = (res, payload = {}) => {
  return ApiResponder(res, httpStatus.OK, payload);
};

const errorResponse = (
  res,
  message = null,
  statusCode = httpStatus.INTERNAL_SERVER_ERROR,
  extra = {}
) => {
  const httpMessage = message || httpStatus[statusCode];
  return ApiResponder(res, statusCode, httpMessage, {}, extra);
};

const abort = (status, message) => {
  throw new ApiError(status, message);
};

const abortIf = (condition, status, message) => {
  if (condition) abort(status, message);
};

const abortUnless = (condition, status, message) => {
  if (!condition) abort(status, message);
};

module.exports = {
  ApiResponder,
  successResponse,
  errorResponse,
  abort,
  abortIf,
  abortUnless,
};
