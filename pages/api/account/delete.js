import { getCollection }    from "@/lib/controller";
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(removeAccount);

async function removeAccount(req, res) {

  // Reject all methods other than POST.
  if (req.method !== 'POST') res.status(405).end();

  // Grab the slug and url from the post body.
  const { slug, ...opts } = req.body;
  const { session } = req

  if (!session?.user?.key) {
    return res.status(403).end()
  }

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    if (!account) return res.status(404).end();

    const { key } = session.user;

    if (!key === account.adminKey) return res.status(403).end()

    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    const deleted = await accounts.delete(account);

    if (!deleted) throw new Error('No response from db.');

    return res.status(200).json({ status: 200 });
  } catch(err) { errorHandler(req, res, err) }
}