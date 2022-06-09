import { getCollection } from "@/lib/controller";
import { JarModel }      from '@/model/jar'

import { nanoid }         from 'nanoid'
import { string, object } from 'yup'
import { errorHandler }   from '@/lib/error'

const schema = object().shape({
  slug : string().trim().matches(/^[\w\-]+$/i),
  url  : string().trim().url().required() 
});

export default async (req, res) => {

  // Reject all methods other than POST.
  if (req.method !== 'POST') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug, url } = req.body;

  try {
    // If protocol is missing, prepend to url.
    if (!url.startsWith('http')) url = 'https://' + url;
    
    // Validate our inputs!
    const isValid = await schema.isValid({ slug, url });
    if (!isValid) return res.status(400).end();

    // Prevents host url from being forwarded to itself.
    const hostname = req.headers.hostname;
    if (url.includes(hostname)) return res.status(400).end();

    // If protocol info missing, add it to the url.
    if (!url.startsWith('http')) url = 'https://' + url;

    // Generates a random slug if none is provided.
    slug = (slug)
      ? slug.toLowerCase()
      : nanoid(5).toLowerCase();

    // Fetches the collection, and checks if the slug exists.
    const urls   = await getCollection(SlugModel),
          exists = await urls.findOne({ slug });
    if (exists) return res.status(409).end();

    // Insert new slug and URL into the collection.
    const created = await urls.insertOne({ slug, url });
    if (!created) throw new Error('No response from db.');

    return res.status(200).end();
  } catch(err) { errorHandler(req, res, err) }
}