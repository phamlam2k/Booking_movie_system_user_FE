import MovieDetail from '@components/screens/MovieDetail'
import Banner from '@src/common/Banner'
import Header from '@src/common/Header'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const MovieDetailPage: NextPage = () => {
  const route = useRouter()
  const { id } = route.query
  console.log(id)
  return (
    <>
      <Head>
        <title>USTH Cinema - Movie</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Banner />
        <MovieDetail id={id} />
      </div>
    </>
  )
}

export default MovieDetailPage
