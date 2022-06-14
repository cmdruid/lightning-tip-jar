import '@/styles/globals.css'
import Layout from '@/components/layout'

import { UserWrapper } from '@/context/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserWrapper>
    </>
  )
}

export default MyApp
