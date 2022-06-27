/** src/error.js */

export function errorHandler(req, res, err) {
  console.error('Caught', err);

  switch(err.name) {
    case 'MongoServerError':
      const schemaErr = err?.errInfo?.details?.schemaRulesNotSatisfied
      if (schemaErr) console.error(JSON.stringify(schemaErr, null, 2))
      break
    default:
      break
  }
  return res.status(500).end();
}

export class APIError extends Error {
  constructor(endpoint, req, status, ...args) {
    super(...args)
    this.name     = 'APIError'
    this.endpoint = endpoint
    this.request  = req
    this.status   = status
    Error.captureStackTrace(this, APIError)
  }
}