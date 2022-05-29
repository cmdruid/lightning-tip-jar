import getclient from 'lib/sparko-client'
import QRCode from 'qrcode'

const client  = getclient()
const offerId = process.env.OFFER_ID

export default async function getoffer(req, res) {
  let data  = await client.call('listoffers');
  let offer = data.offers.find(({offer_id}) => offer_id == offerId)

  if (!offer) {
    return res.status(401).end()
  } else {
    offer.qrcode = await QRCode.toDataURL(offer.bolt12)
    return res.status(200).json(offer)
  }
}