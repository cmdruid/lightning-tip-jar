import { getCollection } from "@/lib/controller";
import { UserModel }     from '@/models/user'
// import { string, object } from 'yup'
import { errorHandler }  from '@/lib/error'
import { createWallet, createPayRequest, getPayRequest } from "@/lib/api";

import { webcrypto } from 'crypto'

// const schema = object().shape({
//   slug : string().trim().matches(/^[\w\-]+$/i),
//   url  : string().trim().url().required()
// });

export default async function createPage(req, res) {

  // Reject all methods other than POST.
  if (req.method !== 'POST') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug, ...opts } = req.body;

  console.log(req.body);

  try {

    // Fetches the collection, and checks if the slug exists.
    const users  = await getCollection(UserModel),
          exists = await users.findOne({ slug });
    if (exists) return res.status(409).end();

    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    // Create a wallet.
    const { adminkey: walletKey, inkey: invoiceKey } = await createWallet(slug);

    // Generate a static pay
    const { id } = createPayRequest(slug, walletKey, { slug, ...opts });
    const { lnurl }  = getPayRequest(invoiceKey, id)

    // Generate random access key.
    const withdrawKey = webcrypto.randomUUID();

    // // Insert new slug and URL into the collection.
    const created = await pages.insertOne({ 
      slug, payRequest: lnurl, walletKey, invoiceKey, withdrawKey, ...opts
    });

    if (!created) throw new Error('No response from db.');

    return res.status(200).json(created);
  } catch(err) { errorHandler(req, res, err) }
}