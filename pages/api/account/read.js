import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from '@/lib/session'

import { 
  authenticateUser,
  stripAccountKeys 
} from '@/lib/auth'

export default withSessionRoute(readAccount);

async function readAccount(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  const { session } = req
  const { slug }    = req.query;

  if (!slug) return res.status(400).end()

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    
    // If account not present, return isAvailable.
    if (!account) return res.status(200).json({ isAvailable: true });

    await authenticateUser(session, account)

    return res.status(200).json(stripAccountKeys(account));

  } catch(err) { errorHandler(req, res, err) }
}