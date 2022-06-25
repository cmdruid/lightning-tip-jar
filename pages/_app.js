import '@/styles/normalize.css'
import '@/styles/globals.css'
import { StrictMode, useEffect } from 'react'

import Layout             from '@/components/Layout'
import { UserWrapper }    from '@/context/UserContext'
import { AccountWrapper } from '@/context/AccountContext'
import { AuthWrapper }    from '@/context/AuthContext'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    // enableWebLn()
  })

  return (
    <>
      <StrictMode>
        <UserWrapper>
          <AccountWrapper>
            <AuthWrapper>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthWrapper>
          </AccountWrapper>
        </UserWrapper>
      </StrictMode>
    </>
  )
}

async function enableWebLn() {
  try {
    if(typeof window.webln !== 'undefined') {
      await window.webln.enable();
      const info = await webln.getInfo();
      console.log(info)
    }
  } catch(error) {
    // User denied permission or cancelled 
    console.error(error);
  }
}