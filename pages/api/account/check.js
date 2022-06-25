import { getCollection }    from '@/lib/controller'
import { AccountModel }     from '@/models/account'
import { errorHandler }     from '@/lib/error'

export default async function checkAccount(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') return res.status(405).end();

  // Grab the slug and url from the post body.
  let { slug } = req.query;

  try {
    // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    
    if (!account) return res.status(200).json({isAvailable: true})

    return res.status(200).json({isAvailable: false})

  } catch(err) { errorHandler(req, res, err) }
}