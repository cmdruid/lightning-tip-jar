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

export function resHandler(res) {
  if (!res.ok) throw new APIError('Returned response:', res.status)
  try {
    return res.json()
  } catch { throw new APIError('Invalid JSON:', res.text()) }
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