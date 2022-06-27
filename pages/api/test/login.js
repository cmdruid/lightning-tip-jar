import { utils } from '@noble/secp256k1'
import { encrypt } from '@/lib/crypto'
import { withSessionRoute } from "@/lib/session";
import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'

export default withSessionRoute(fakeLogin);

async function fakeLogin(req, res) {
  /* Fake login for testing. Do not push this to production.
   */

  if (process.env.VERCEL_ENV === 'production') {
    return res.status(404).end()
  }

  const { slug } = req.query

  console.log(slug)

  if (req.session) {
    await req.session.destroy();
  }

  let key;

  if (slug) {
    try {
      // Fetches the collection, and checks if the slug exists.
      const accounts = await getCollection(AccountModel),
            account  = await accounts.findOne({ slug });
      if (!account) throw new Error('account does not exist!')
      key = account.keys.adminKey
    } catch(err) { console.error(err) }
  } else {
    key = await encrypt(utils.bytesToHex(utils.randomBytes(32)))
  }

  /* Generate a new user for browser. */
  req.session.user = { key }
  await req.session.save();

  return res.status(200).json(req.session);
}