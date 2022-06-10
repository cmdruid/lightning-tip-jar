import { getCollection } from "@/lib/controller";
import { JarModel }      from '@/models/jar'
// import { string, object } from 'yup'
import { errorHandler }   from '@/lib/error'

// const schema = object().shape({
//   slug : string().trim().matches(/^[\w\-]+$/i),
//   url  : string().trim().url().required()
// });

export default async function createJar(req, res) {

  // Reject all methods other than POST.
  if (req.method !== 'POST') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug, title, description, ...opts } = req.body;

  console.log(req.body);

  try {
    // Validate our inputs!
    // const isValid = await schema.isValid({ slug, url });
    // if (!isValid) return res.status(400).end();

    // Generate a wallet.

    // Generate lnbits Pay Code
    
    // Generate unique url

    // Fetches the collection, and checks if the slug exists.
    // const jars   = await getCollection(JarModel),
    //       exists = await urls.findOne({ slug });
    // if (exists) return res.status(409).end();

    // // Insert new slug and URL into the collection.
    // const created = await jars.insertOne({ slug, url });
    // if (!created) throw new Error('No response from db.');

    return res.status(200).json({ok: true});
  } catch(err) { errorHandler(req, res, err) }
}