import type { NextPage } from 'next'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthLayout } from '../src/common/AuthLayout'
import Link from 'next/link'
import { HOME, REGISTER, VERIFY } from '../src/config/path'
import { postAxios } from '@utils/Http'
import { API_LOGIN, API_RE_REGISTER } from '@config/endpointApi'
import { AUTH_TOKEN, ERR_BAD_REQUEST, ERR_NETWORK, USER_INFO, VERIFY_ID } from '@config/const'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

type DataForm = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const Login: NextPage = () => {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleLogin = (data: any) => {
    postAxios(API_LOGIN, data)
      .then((res: any) => {
        console.log(res)
        if (res.user.confirm === 0) {
          handleResend(res.user.email)
        } else {
          localStorage.setItem(USER_INFO, JSON.stringify(res.user))
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(res.access_token))
          route.replace(HOME)
        }
      })
      .catch(({ code, response, message }) => {
        if (code === ERR_BAD_REQUEST) {
          if (response.status === 400) {
            toast.error(response.data.message)
          } else if (response.status === 401) {
            toast.error('Please register this email')
          } else {
            toast.error('Wrong email or password')
          }
        } else if (code === ERR_NETWORK) {
          toast.error(message)
        }
      })
  }

  const handleResend = (email: string) => {
    postAxios(API_RE_REGISTER, { email })
      .then((res: any) => {
        localStorage.setItem(
          VERIFY_ID,
          JSON.stringify({
            userId: res.user.id,
            verifyOTP: res.user.confirmation_code,
            expired_in: res.user.confirmation_code_expired_in,
            email: res.user.email,
          }),
        )
        route.replace(VERIFY)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AuthLayout title="Login">
      <div className="w-[100%]">
        <div className="font-bold text-[30px] text-center text-white">Login</div>
        <form className="" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-[15px]">
            <div className="text-white text-[20px]">Email :</div>
            <input
              {...register('email')}
              placeholder="Please enter your email"
              className="w-[100%] pl-[10px] py-[5px]"
            />
            <div className="text-red-400">{errors.email && <span>Please enter email</span>}</div>
          </div>
          <div className="flex flex-col gap-[15px] mt-[10px]">
            <div className="text-white text-[20px]">Password :</div>
            <input
              {...register('password')}
              placeholder="Please enter your password"
              type={'password'}
              className="w-[100%] pl-[10px] py-[5px]"
            />
            <div className="text-red-400">{errors.password && <span>Please enter password</span>}</div>
          </div>
          <div className="flex justify-between mt-[10px] text-white">
            <Link href={'#'}>
              <a>Forgot Password</a>
            </Link>
            <Link href={REGISTER}>
              <a>Don&apos;t have account?</a>
            </Link>
          </div>
          <button type="submit" className="w-[100%] text-center py-[5px] bg-white mt-[20px]">
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
