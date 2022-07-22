import UserProfile from '@components/screens/UserProfile'
import { API_USER_PROFILE } from '@config/endpointApi'
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

const UserProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>USTH Cinema - User Profile</title>
      </Head>
      <Header />
      <Banner />
      <UserProfile />
      <Footer />
    </>
  )
}

export default UserProfilePage
