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

  // If you want to disable account creating, uncomment this.
  // return res.status(200).json({})

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

    console.log(slug, walletKey, opts)

    // Generate a static pay
    const payRequest = await createPayRequest(slug, walletKey, opts);
    const { id } = payRequest
    const { lnurl } = await getPayRequest(invoiceKey, id)

    console.log(id, lnurl)

    // Generate random access key.
    const withdrawKey = webcrypto.randomUUID();

    const newUser = { slug, payRequest: lnurl, walletKey, invoiceKey, withdrawKey, ...opts }

    console.log(newUser)

    // // Insert new slug and URL into the collection.
    const created = await users.insertOne(newUser);

    if (!created) throw new Error('No response from db.');

    return res.status(200).json(created);
  } catch(err) { errorHandler(req, res, err) }
}