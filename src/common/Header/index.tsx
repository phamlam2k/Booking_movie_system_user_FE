/* eslint-disable @next/next/no-img-element */
import { USER_INFO } from '@config/const'
import { isLogin } from '@config/function'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { HOME, LOGIN, MOVIE_COMING_SOON, MOVIE_NOW_SHOWING, REGISTER, TICKET, USER_PROFILE } from '../../config/path'
import { UserIcon } from '../Icons'

const MENU_LINK = [
  {
    href: HOME,
    name: 'Home',
  },
  {
    href: MOVIE_NOW_SHOWING,
    name: 'Showing now',
  },
  {
    href: MOVIE_COMING_SOON,
    name: 'Coming soon',
  },
  {
    href: TICKET,
    name: 'My Ticket',
  },
]

const Header = () => {
  const { pathname, push } = useRouter()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    if (typeof window !== undefined) {
      setUserInfo(JSON.parse(localStorage.getItem(USER_INFO) || '{}').full_name?.split(' ')[0])
    }
  }, [])

  const handleSwitchUserProfile = () => {
    push(USER_PROFILE)
  }

  return (
    <div className="w-full bg-[#00000059] shadow-2xl fixed">
      <div className="flex w-[65%] justify-between m-auto gap-[30px]">
        <img src="/images/usth.png" alt="logo usth" className="w-[100px] object-cover py-[10px]" />
        <div className="flex items-center gap-[20px]">
          {MENU_LINK.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`text-[16px] font-bold text-white cursor-pointer ${
                  pathname === link.href ? 'text-black bg-white' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
          {isLogin() ? (
            <div className="text-white font-bold flex items-center cursor-pointer" onClick={handleSwitchUserProfile}>
              <UserIcon className="w-[30px] h-[30px]" />
              <div>{userInfo}</div>
            </div>
          ) : (
            <Link href={LOGIN}>
              <a
                className={`text-[16px] font-bold cursor-pointer ${
                  pathname === LOGIN || pathname === REGISTER ? 'text-black bg-white' : 'text-white'
                }`}
              >
                Login/Register
              </a>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  )
}

export default Header
