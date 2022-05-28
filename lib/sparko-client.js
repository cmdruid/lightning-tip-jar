import sparko from 'sparko-client'

let client = null;

export default function getclient() {
  if (!client) client = sparko(process.env.SPARK_URL, process.env.SPARK_KEY)
  return client
}
