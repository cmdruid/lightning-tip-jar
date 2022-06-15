import { getCollection }    from "@/lib/controller";
import { AccountModel }     from '@/models/account'
// import { string, object } from 'yup'
import { errorHandler }     from '@/lib/error'
import { withSessionRoute } from "@/lib/session";
import { 
  createWallet, 
  createPayRequest, 
  getPayRequest 
} from "@/lib/api";

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

  // Grab the slug and url from the post body.
  const { slug, ...opts } = req.body;
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
    const { id }    = await createPayRequest(slug, walletKey, opts);
    const { lnurl } = await getPayRequest(invoiceKey, id)

    const newAccount = { 
      slug, 
      payRequest : lnurl,
      adminKey   : session.user.key,
      walletKey,
      invoiceKey,
      ...opts 
    }

    console.log('New Account:', newAccount)

    // // Insert new slug and URL into the collection.
    const created = await accounts.insertOne(newAccount);

    if (!created) throw new Error('No response from db.');

    return res.status(200).json({ status: 200 });
  } catch(err) { errorHandler(req, res, err) }
}