import getclient from '@lib/sparko-client'

const client = getclient()

export default function getinvoices(req, res) {
  let invoices = client.call('listinvoices');
  res.status(200).json(invoices)
}