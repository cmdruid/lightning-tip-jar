import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'
import { encrypt }          from '@/lib/crypto'
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(readAccount);

async function readAccount(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug } = req.query;

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    
    if (!account) return res.status(200).json({});

    const { invoiceKey, walletKey, ...accObj } = account

    accObj.invoiceKey  = await encrypt(invoiceKey)
    accObj.walletKey   = await encrypt(walletKey)

    return res.status(200).json(accObj)

  } catch(err) { errorHandler(req, res, err) }
}