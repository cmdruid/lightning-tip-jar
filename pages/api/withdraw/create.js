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

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab our required params from host body.
  const { session } = req,
           { host } = req.headers,
           { slug } = req.query;

  if (!slug) {
    return res.status(403).json({ err: 'No account provided!' })
  }

  if (!session?.user?.key) {
    return res.status(403).json({ err: 'Need to be logged in!' })
  }

  const lnurl = await getClaimUrl(host, slug, session.user.key)
        
  res.status(200).json({ lnurl });

}

async function getClaimUrl(host, slug, key) {
  const token  = { slug, key },
        secret = await encrypt(JSON.stringify(token));
  return encodeLnurl(`https://${host}/api/withdraw/claim?s=${secret}`)
}
