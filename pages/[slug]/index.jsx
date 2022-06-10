import { useRouter } from 'next/router'
import { useEffect } from 'react';
import useSWR from 'swr'
import TipJarForm from '@/components/TipJarForm/index.js'
import Loading from '@/components/Loading/index.js'
import Error from '@/components/Error/index.js'
import TipMerchant from '@/components/TipMerchant/index.js'

const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}


export default function Page() {
  let url;
  let user;
  if (typeof window !== 'undefined') {
    url = window.location.href.split('/');
    user = url.pop();
  }
  const { data, error } = useSWR(`/api/user/loadUser?slug=${user}`, fetcher)

  switch(true) {
    case error:
      return <Error />
    case !data:
      return <Loading />
    case (data && !data.slug):
      return <TipJarForm slug={user} />
    default:
      let userString = JSON.stringify(data, null, 2)
      return <TipMerchant userString={data} />
  }
}