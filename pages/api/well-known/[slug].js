import { getCollection } from "@/lib/controller";
import { UserModel }     from '@/models/user'
import { errorHandler }  from '@/lib/error'

export default async function loadUser(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { slug } = req.query;

  let errResponse = msg => { return { "status": "ERROR", "reason": msg } }

  try {
  // Fetches the collection, and checks if the slug exists.
    const users = await getCollection(UserModel),
          user  = await users.findOne({ slug });

    if (user) return res.status(200).json(errResponse("Account not found!"));

    return res.status(200).json({
      "callback": string, // The URL from LN SERVICE which will accept the pay request parameters
      "maxSendable": number, // Max millisatoshi amount LN SERVICE is willing to receive
      "minSendable": number, // Min millisatoshi amount LN SERVICE is willing to receive, can not be less than 1 or more than `maxSendable`
      "metadata": string, // Metadata json which must be presented as raw string here, this is required to pass signature verification at a later step
      "tag": "payRequest" // Type of LNURL
    })
  } catch(err) { 
    console.log(err)
    errorHandler(req, res, err) 
  }
}

function getMetaData(text, desc) {
  return JSON.stringify([
    [ "text/plain", text ],
    [ "text/long-desc", desc ],
    // [ "image/png;base64", string ],
    // [ "image/jpeg;base64", string ],
    [ "text/identifier", `${slug}@${process.env.HOST_URL}`]
  ])
}