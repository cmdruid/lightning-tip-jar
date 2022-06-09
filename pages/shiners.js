// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
// import Link from 'next/link'

import PlebQRCode from '@/components/PlebQRCode'
// import Landing from 'components/Landing/index.js'
// import { FaGithub } from 'react-icons/fa'

export default function Cars() {
  return (
    <div className={"dummy"}>
      {/* <Link href="/cars"> Click Me</Link> */}
      <h2>Shiners</h2>
      <PlebQRCode/>
      <h2>Admin Panel</h2>
      <form action="/">
          <label>LN-URL</label>
          <input type="text" placeholder="LN-URL" />
          <input type="submit"/>
      </form>
    </div>
  )
}
