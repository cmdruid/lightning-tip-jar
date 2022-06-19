import { getCollection }    from "@/lib/controller";
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(updateAccount);

async function updateAccount(req, res) {

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
          exists   = await accounts.findOne({ slug });
    if (!exists) return res.status(404).end();

    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    const updatedAccount = { opts }

    console.log('Updated Account:', updatedAccount)

    // // Insert new slug and URL into the collection.
    const updated = await accounts.updateOne(newAccount);

    if (!updated) throw new Error('No response from db.');

    return res.status(200).json({ status: 200 });
  } catch(err) { errorHandler(req, res, err) }
}