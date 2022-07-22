import Payment from '@components/screens/Payment'
import { VERIFY_ID } from '@config/const'
import { isVerify } from '@config/function'
import { HOME } from '@config/path'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useLayoutEffect, useState } from 'react'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const PaymentPage: NextPage = () => {
  const [tickets, setTickets] = useState()
  const route = useRouter()

  useLayoutEffect(() => {
    if (!isVerify()) {
      route.push(HOME)
    }

    if (typeof window !== undefined) {
      console.log(localStorage.getItem(VERIFY_ID))
    }
  }, [])

  return (
    <>
      <Head>
        <title>USTH Cinema - Payment</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <Payment />
        <Footer />
      </div>
    </>
  )
}

export default PaymentPage
