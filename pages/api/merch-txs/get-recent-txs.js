const mockTxData = [
  {amount: 1000,  msg: 'cool bar 👍 ',            date: '2022-06-07T00:00:00.000Z', txid: 4723, },
  {amount: 3320,  msg: 'exceptional service :)',  date: '2022-06-07T13:56:00.000Z', txid: 4724,},
  {amount: 69,    msg: 'elon was here',           date: '2022-06-07T13:57:00.000Z', txid: 4725,},
  {amount: 420,   msg: '',                        date: '2022-06-07T13:57:17.000Z', txid: 4726,},
]
export default async function endpoint(req, res) {

  // mockTxData
  //   .sort((a, b) => b.date - a.date)
  //   .splice(0,5)

  
  res.status(200).json({payments: mockTxData})
}
