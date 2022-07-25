import Head from 'next/head'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const ComingSoon = dynamic<any>(() => import('@components/screens/ComingSoon').then((mod) => mod.ComingSoon), {
  ssr: false,
})

const ComingSoonPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Now Showing</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <ComingSoon />
        <Footer />
      </div>
    </>
  )
}

export default ComingSoonPage
