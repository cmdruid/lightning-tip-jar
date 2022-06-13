import { utils } from '@noble/secp256k1'
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(fakeLogin);

if (process.env.VERCEL_ENV === 'production') throw 'Do not push this endpoint to production!'

async function fakeLogin(req, res) {
  /* Fake login for testing. Do not push this to production.
   */
  const { session } = req;

  if (!session.user) {
    /* Generate a new user for browser. */
    session.user = {
      key: utils.bytesToHex(utils.randomBytes(32))
    }
    await req.session.save();
  }
  res.status(200).json(session);
}