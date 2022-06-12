/** src/error.js */

export function errorHandler(req, res, err) {
  console.error('Caught', err);
  return res.status(500).end();
}

export function resHandler(res) {
  if (!res.ok) {
    throw new APIError('Returned response:', res.status)
  }
  return res
}

export class APIError extends Error {
  constructor(endpoint, req, ...args) {
    super(...args)
    this.name     = 'APIError'
    this.endpoint = endpoint
    this.request  = req
    Error.captureStackTrace(this, APIError)
  }
}