import Ticket from '@components/screens/Ticket'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const TicketPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Ticket</title>
      </Head>
      <Header />
      <Banner />
      <Ticket />
      <Footer />
    </>
  )
}

export default TicketPage
