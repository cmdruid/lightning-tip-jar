import { getCollection } from '@/lib/controller'
import { AccountModel }  from '@/models/account'
import { createInvoice } from '@/lib/api'
import { errorHandler }  from '@/lib/error'

export default async function payName(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  const { url }  = req;
  const { host } = req.headers;
  const { slug, amount } = req.query;

  try {
  // Fetches the collection, and checks if the slug exists.
    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });

    if (account) {
      if (amount) {
        const { invoiceKey } = account;
        const memo = getMetaData(slug, host),
              msat = amount / 1000;
        const { payment_request } = await createInvoice(slug, msat, invoiceKey, memo);
        console.log(payment_request)
        return res.status(200).json({ pr: payment_request, routes: [] })
      } else {
        let response = {
          "callback": `https://${host}${url}`,
          "maxSendable": 999999999,
          "minSendable": 10,
          "metadata": getMetaData(slug, host),
          "tag": "payRequest"
        }
        console.log(response)
        return res.status(200).json(response);
      }
    }

    return res.status(200).json({ "status": "ERROR", "reason": "Account does not exist!" });

  } catch(err) { errorHandler(req, res, err) }
}

function getMetaData(name, host = 'localhost') {
  return JSON.stringify([
    [ "text/plain", `Tipped ${name}@sats4.tips` ],
    // [ "text/long-desc", '' ],
    // [ "image/png;base64", string ],
    // [ "image/jpeg;base64", string ],
    [ "text/identifier", `${name}@${host}`]
  ])
}