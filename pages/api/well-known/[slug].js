import { getCollection } from "@/lib/controller";
import { AccountModel }  from '@/models/account'
import { errorHandler }  from '@/lib/error'

export default async function payName(req, res) {

  console.log(req.headers)
  console.log(req.url)

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug, amount } = req.query;

  try {
  // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });

    if (account) {
      if (amount) {
        const request = createInvoice(slug, amount)
        console.log(request)
        return res.status(200).json({ pr: '', routes: [] })
      } else {
        return res.status(200).json({
          "callback": `${url}?slug=${slug}`,
          "maxSendable": 999999999,
          "minSendable": 10,
          "metadata": getMetaData(text, desc),
          "tag": "payRequest"
        })
      }
    }

    return res.status(200).json({ "status": "ERROR", "reason": "Account does not exist!" });

  } catch(err) { errorHandler(req, res, err) }
}

function getMetaData(text, desc, url = 'localhost') {
  return JSON.stringify([
    [ "text/plain", text ],
    [ "text/long-desc", desc ],
    // [ "image/png;base64", string ],
    // [ "image/jpeg;base64", string ],
    [ "text/identifier", `${slug}@${url}`]
  ])
}