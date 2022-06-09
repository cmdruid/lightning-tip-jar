import { getCollection } from "@/lib/controller";
import { JarModel }      from '@/models/jar'
import { errorHandler }  from '@/lib/error'

export default async function LoadJar(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug } = req.query;

  try {
    // Fetches the collection, and checks if the slug exists.
    const jars   = await getCollection(JarModel),
          tipjar = await jars.findOne({ slug });

    if (tipjar) {
      return res.status(200).json({jar: tipjar});
    }

    return res.status(200).json({})

  } catch(err) { 
    console.log(err)
    errorHandler(req, res, err) 
  }
}