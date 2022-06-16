import '@/styles/normalize.css'
import '@/styles/globals.css'
import Layout from '@/components/layout'
import { StrictMode }  from 'react'
import { UserWrapper } from '@/context/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StrictMode>
        <UserWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserWrapper>
      </StrictMode>
    </>
  )
}

export default MyApp
