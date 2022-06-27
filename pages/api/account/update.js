import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from '@/lib/session'

import { 
  hasAccountEntry,
  hasAccountAccess,
  stripAccountData 
} from '@/lib/auth'

export default withSessionRoute(updateAccount);

async function updateAccount(req, res) {

  // Reject all methods other than POST.
  if (req.method !== 'POST') return res.status(405).end();

  // Grab the slug and url from the post body.
  const { slug, info, styles, contact } = req.body;
  const { session } = req

  if (!session?.user?.key) {
    return res.status(401).end()
  }

  if (!hasAccountEntry(session, slug)) {
    return res.status(403).end()
  }

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    if (!account) return res.status(404).end();

    if (!hasAccountAccess(session, account)) {
      return res.status(403).end()
    }

    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    if (info?.logo) info.logo = JSON.stringify(info.logo)

    // // Insert new slug and URL into the collection.
    const { acknowledged } = await accounts.updateOne(
      { slug }, 
      { $set: { info, styles, contact } }
    )

    if (!acknowledged) {
      throw new Error('DB did not acknowledge update')
    }

    const updatedAccount = { ...account, info }

    return res.status(200).json(stripAccountData(session, updatedAccount))
  } catch(err) { errorHandler(req, res, err) }
}