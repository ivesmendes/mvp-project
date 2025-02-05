import { SessionProvider } from 'next-auth/react'
import React from 'react';
import '../global.css'

function MyApp({
   Component, 
   pageProps: {session, ...pageProps}
  }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;
