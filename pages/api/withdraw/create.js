/**
 * Authenticate the user, then return an lnurl containing the withdraw endpoint, 
 * plus an encrypted json object with the account name, user's key, and timestamp.
 */

import { encrypt }          from '@/lib/crypto';
import { encodeLnurl }      from '@/lib/utils'
import { withSessionRoute } from '@/lib/session'

export default withSessionRoute(createWithdraw);

async function createWithdraw(req, res) {
  /* Withdraw invoice creation.
   */

  const { host } = req.headers,
        { slug, amt, memo } = req.query;

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(405).end();

  if (!(slug && amt)) {
    return res.status(400).end()
  }

  // Reject sessions without a login or wallet.
  if (!req?.session?.user) {
    return res.status(401).end()
  }
  
  // Reject users without a key stored for this account.
  if (!hasAccountEntry(req.session, slug)) {
    return res.status(403).end()
  }

  // Grab access key from the query.
  const apikey = req.session.wallet[slug]

  const lnurl = await getClaimUrl(host, { slug, amt, key })
        
  res.status(200).json({ amt, lnurl });
}

async function getClaimUrl(host, token) {
  const secret = await encrypt(JSON.stringify(token));
  return encodeLnurl(`https://${host}/api/withdraw/claim?s=${secret}`)
}
