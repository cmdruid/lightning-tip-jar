import { utils } from '@noble/secp256k1'
import { withSessionRoute } from "@/lib/session";
import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'

export default withSessionRoute(fakeLogin);

if (process.env.VERCEL_ENV === 'production') throw 'Do not push this endpoint to production!'

async function fakeLogin(req, res) {
  /* Fake login for testing. Do not push this to production.
   */

  const { session } = req;
  const { slug }    = req.query

  if (!session.user) {
    let key;

    if (slug) {
      try {
        // Fetches the collection, and checks if the slug exists.
        const accounts = await getCollection(AccountModel),
              account  = await accounts.findOne({ slug });   
        if (!account) throw new Error('account does not exist!')
        key = account.adminKey
      } catch(err) { console.error(err) }
    } else {
      key = utils.bytesToHex(utils.randomBytes(32))
    }

    /* Generate a new user for browser. */
    session.user = { key }
    await req.session.save();
  }

  res.status(200).json({ session });
}