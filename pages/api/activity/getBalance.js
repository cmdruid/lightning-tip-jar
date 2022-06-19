import { getBalance }   from '@/lib/api'
import { decrypt }      from '@/lib/crypto';
import { errorHandler } from '@/lib/error';

export default async function getCurrentBalance(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab access key from the query.
  let { invoiceKey } = req.query;

  if (!invoiceKey) res.status(400).end();

  try {
    const decryptedKey = await decrypt(invoiceKey)
    const { balance }  = await getBalance(decryptedKey);
    
    return res.status(200).json({ balance })
  } catch(err) { errorHandler(req, res, err) }
}