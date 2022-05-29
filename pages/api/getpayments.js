import getclient from 'lib/sparko-client'

const client = getclient()

function invoiceFilter(invoice) {
  const isRelevant = invoice.local_offer_id === process.env.OFFER_ID
  const isPaid = invoice.status === "paid"
  return isRelevant && isPaid
}

export default async function getpayments(req, res) {
  let data = await client.call('listinvoices',{},'0-25');
  let paidInvoices = data.invoices.filter((e) => invoiceFilter(e))

  const payments = []

  for (let invoice of paidInvoices) {
    payments.push({
      description: invoice.description,
      note: invoice.payer_note,
      amount: Number(invoice.msatoshi) / 1000,
      date: new Date(Number(invoice.paid_at) * 1000),
    })
  }

  res.status(200).json(payments)
}