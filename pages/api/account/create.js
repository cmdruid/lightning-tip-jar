import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from '@/lib/session'
import { encrypt }          from '@/lib/crypto'

import { 
  authenticateUser,
  stripAccountKeys 
} from '@/lib/auth'

import { 
  createWallet, 
  createPayRequest, 
  getPayRequest 
} from '@/lib/api'

// import { string, object } from 'yup'

export default withSessionRoute(createAccount);

// const schema = object().shape({
//   slug : string().trim().matches(/^[\w\-]+$/i),
//   url  : string().trim().url().required()
// });

async function createAccount(req, res) {

  // If you want to disable account creating, uncomment this.
  // return res.status(200).json({})

  // Reject all methods other than POST.
  if (req.method !== 'POST') res.status(405).end();

  // Grab the slug and account info from the post body.
  const { slug, ...info } = req.body;
  const { session } = req

  if (!session?.user?.key) {
    return res.status(403).json({ err: 'Need to be logged in!' })
  }

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          exists   = await accounts.findOne({ slug });
    if (exists) return res.status(409).end();

    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    // Create a wallet.
    const { adminkey: walletKey, inkey: invoiceKey } = await createWallet(slug);

    // Generate a static payRequest.
    const { id }    = await createPayRequest(slug, walletKey);
    const { lnurl } = await getPayRequest(invoiceKey, id)

    const newAccount = { 
      slug,
      isVerified   : false,
      payRequest   : lnurl,
      info,
      keys: {
        adminKey   : session.user.key,
        walletKey  : await encrypt(walletKey),
        invoiceKey : await encrypt(invoiceKey)
      }
    }

    console.log('New Account:', newAccount)

    // // Insert new slug and URL into the collection.
    const created = await accounts.insertOne(newAccount);
    if (!created) throw new Error('No response from db.');

    await authenticateUser(session, newAccount)

    return res.status(200).json(stripAccountKeys(newAccount));

  } catch(err) { errorHandler(req, res, err) }
}