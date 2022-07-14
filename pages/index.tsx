import Home from '@components/screens/Home'
import Banner from '@src/common/Banner'
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
      </div>
    </>
  )
}

export default HomePage
