/** src/error.js */

export function errorHandler(req, res, err) {
  console.error('Error found: ', err.stack);
  if (req.method === 'POST') return res.end();
  return res.status(500).json(err.stack);
}