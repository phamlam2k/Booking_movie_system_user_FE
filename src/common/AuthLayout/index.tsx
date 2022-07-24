import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import LeftPanel from '../../widget/Authentication/LeftPanel'
import RightPanel from '../../widget/Authentication/RightPanel'
import { useRouter } from 'next/router'
import { LOGIN } from '@config/path'

interface Props {
  title: string
  children?: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const AuthLayout: React.FC<React.PropsWithChildren<Props>> = React.memo(({ title, children }) => {
  const route = useRouter()
  return (
    <>
      <Head>
        <title>{`USTH Cinema - ${title}`}</title>
      </Head>
      <div className="bg-[url('/images/backgroundAuth.webp')] bg-cover bg-no-repeat w-screen h-screen">
        <Header />
        <main className={`pt-[180px] ${route?.pathname === LOGIN && 'pb-[150px]'}`}>
          <div className="w-[900px] flex m-auto bg-[#000000a6] rounded-lg">
            <LeftPanel />
            <RightPanel>{children}</RightPanel>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
})
