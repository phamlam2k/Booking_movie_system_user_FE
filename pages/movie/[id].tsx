import { NextPage } from 'next'
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

const MovieDetail = dynamic<any>(() => import('@components/screens/MovieDetail').then((mod) => mod.MovieDetail), {
  ssr: false,
})

const MovieDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - Movie</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <MovieDetail />
        <Footer />
      </div>
    </>
  )
}

export default MovieDetailPage
