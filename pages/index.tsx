import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Home = dynamic<any>(() => import('@components/screens/Home').then((mod) => mod.Home), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Home</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <Home />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
