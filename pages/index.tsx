import Home from '@components/screens/Home'
import Banner from '@src/common/Banner'
import Footer from '@src/common/Footer'
import Header from '@src/common/Header'
import type { NextPage } from 'next'
import Head from 'next/head'

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
