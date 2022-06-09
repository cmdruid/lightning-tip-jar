import { useRouter } from 'next/router'
import { useEffect } from 'react';
import useSWR from 'swr'

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

  const { data, error } = useSWR(`/api/jar/loadjar?slug=test`, fetcher)

  switch(true) {
    case error:
      return <div>Error: {error}</div>
    case !data:
      return <div><p>Loading...</p></div>
    case (data && !data.jar):
      return <div>Tipjar not found!</div>
    default:
      let jarString = JSON.stringify(data.jar, null, 2)
      return <div>{jarString}</div>
  }
}