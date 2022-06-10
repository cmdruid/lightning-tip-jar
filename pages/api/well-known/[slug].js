// import { getCollection } from "@/lib/controller";
// import { UserModel }     from '@/models/user'
// import { errorHandler }  from '@/lib/error'

// export default async function loadUser(req, res) {

//   // Reject all methods other than GET.
//   if (req.method !== 'GET') res.status(400).end();

//   // Grab the slug and url from the post body.
//   let { slug } = req.query;

//   let errResponse = msg => { return { "status": "ERROR", "reason": msg } }

//   try {
//   // Fetches the collection, and checks if the slug exists.
//     const users = await getCollection(UserModel),
//           user  = await users.findOne({ slug });

//     if (user) return res.status(200).json(errResponse("Account not found!"));

//     return res.status(200).json({
//       "callback": string,
//       "maxSendable": 21e15,
//       "minSendable": 100,
//       "metadata": getMetaData(text, desc),
//       "tag": "payRequest"
//     })

//   } catch(err) { 
//     console.log(err)
//     errorHandler(req, res, err) 
//   }
// }

// function getMetaData(text, desc) {
//   return JSON.stringify([
//     [ "text/plain", text ],
//     [ "text/long-desc", desc ],
//     // [ "image/png;base64", string ],
//     // [ "image/jpeg;base64", string ],
//     [ "text/identifier", `${slug}@${process.env.HOST_URL}`]
//   ])
// }