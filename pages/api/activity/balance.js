import { getBalance }   from '@/lib/api'
import { decrypt }      from '@/lib/crypto';
import { errorHandler } from '@/lib/error';
import { withSessionRoute } from "@/lib/session";
import { hasAccountEntry }  from '@/lib/auth';

export default withSessionRoute(balance);

async function balance(req, res) {

  const { slug } = req.query;

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

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

  try {
    const decryptedKey = await decrypt(apikey)
    let { balance } = await getBalance(decryptedKey) / 1000;

    balance = (balance > 10) ? balance : 0;
    
    return res.status(200).json({ balance })
  } catch(err) { errorHandler(req, res, err) }
}