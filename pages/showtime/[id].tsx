import Head from 'next/head'
import ShowtimeDetail from '@components/screens/ShowtimeDetail'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const SeatDetails = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Showtime</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <ShowtimeDetail />
        <Footer />
      </div>
    </>
  )
}

export default SeatDetails
