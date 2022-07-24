import Head from 'next/head'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

const Header = dynamic(() => import('@src/common/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('@src/common/Footer'), {
  ssr: false,
})

const ShowtimeDetail = dynamic<any>(
  () => import('@components/screens/ShowtimeDetail').then((mod) => mod.ShowtimeDetail),
  {
    ssr: false,
  },
)

const Banner = dynamic(() => import('@src/common/Banner'), {
  ssr: false,
})

const ShowtimePage: NextPage = () => {
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

export default ShowtimePage
