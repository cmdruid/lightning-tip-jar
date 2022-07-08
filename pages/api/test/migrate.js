import { getCollection } from '@/lib/controller'
import { AccountModel }  from '@/models/account'
import { decrypt, hash } from '@/lib/crypto'

export default async function migrate(req, res) {
  
  if (process.env.VERCEL_ENV === 'production') {
    return res.status(404).end()
  }

  const { slug } = req.query

  try {

    const coll = await getCollection(AccountModel),
          account = await coll.findOne({ slug });

    const { keys } = account;

    console.log('Migrating key for account: ', slug)
    console.log('Current Key: ', keys.adminKey)

    const decryptedKey = await decrypt(keys.adminKey)
    const newKey = await hash(decryptedKey)

    console.log('New Key: ', newKey)

    const newKeys = { ...keys, adminKey: newKey }

    const { acknowledged } = await coll.updateOne(
      { slug },
      { $set: { keys: newKeys } }
    )

    if (!acknowledged) {
      throw new Error('DB did not acknowledge update')
    }

    console.log('Upgraded key sucessfully!')

  } catch(err) { return res.status(500).json({ err }) }

  return res.status(200).json({ msg: 'done' });
}