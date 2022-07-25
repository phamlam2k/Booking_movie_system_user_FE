import Head from 'next/head'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { NowShowing } from '@components/screens/ShowingNow'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const ShowNowPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Now Showing</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <NowShowing />
        <Footer />
      </div>
    </>
  )
}

export default ShowNowPage
