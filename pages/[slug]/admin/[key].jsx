import { useRouter } from 'next/router'
import { useEffect } from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function User() {

  const router = useRouter();

  console.log(router)

  // useEffect(()=>{
  //   console.log('test!')
  //   if (!router.isReady) return;

  //   const { slug } = router.query
  //   console.log(slug)

  // }, [ router.isReady, router.query ]);

  // const { data, error } = useSWR(`/api/jar/loadJar?slug=${'slug'}`, fetcher)
  
  // if (error) return <div>failed to load!</div>
  // if (!data) return <div>loading...</div>

  return (
    <div className="container">
      <p>Data:</p>
    </div>
  )
}