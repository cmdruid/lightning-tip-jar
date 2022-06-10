import { listPayments } from '@/lib/api'

export default async function getTransactions(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { walletKey } = req.query;

  if (!walletKey) res.status(400).end();

  let transactions = await listPayments(walletKey)

  const payments = transactions.map(item => {
    return {
      amount: item.amount,
      msg: item.extra.comment,
      date: item.time,
      txid: null,
    }
  })
  
  return res.status(200).json({payments: payments})
}