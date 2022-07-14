import { AuthLayout } from '../src/common/AuthLayout'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { isVerify } from '@config/function'
import { postAxios } from '@utils/Http'
import { API_LOGOUT_VERIFY, API_RE_REGISTER, API_VERIFY } from '@config/endpointApi'
import { toast } from 'react-toastify'
import { LOGIN } from '@config/path'
import { ERR_BAD_REQUEST, ERR_NETWORK, VERIFY_ID } from '@config/const'

type DataForm = {
  OTP_token: number
}

const schema = yup.object().shape({
  OTP_token: yup.string().required(),
})

const Verify = () => {
  const route = useRouter()
  const [checkResend, setCheckResend] = useState(false)
  const [second, setSecond] = useState(0)
  const [error, setError] = useState(false)
  const [dataVerify, setDataVerify] = useState({ user_id: null, OTP_token: null, email: '' })

  useEffect(() => {
    if (!checkResend) {
      if (!isVerify()) {
        route.replace(LOGIN)
      } else {
        const verify = JSON.parse(localStorage.getItem(VERIFY_ID) || '')
        setDataVerify({ user_id: verify.userId, OTP_token: verify.verifyOTP, email: verify.email })
        if (moment(verify.expired_in).unix() - moment().unix() > 0) {
          const myInterval = setInterval(() => {
            if (moment(verify.expired_in).unix() - moment().unix() === 0) {
              clearInterval(myInterval)
              setCheckResend(true)
            }
            setSecond(moment(verify.expired_in).unix() - moment().unix())
          }, 1000)
          return () => {
            clearInterval(myInterval)
          }
        }
      }
    }
  }, [checkResend])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleVerify = (data: DataForm) => {
    if (data.OTP_token != dataVerify.OTP_token) {
      setError(true)
    } else {
      postAxios(API_VERIFY, { user_id: dataVerify.user_id, OTP_token: data.OTP_token })
        .then((res: any) => {
          localStorage.removeItem(VERIFY_ID)
          toast.success(res.message)
          setTimeout(() => route.replace(LOGIN), 1000)
        })
        .catch(({ code, response, message }) => {
          if (code === ERR_BAD_REQUEST) {
            if (response.status === 400) {
              toast.error(response.data.message)
            }
          } else if (code === ERR_NETWORK) {
            toast.error(message)
          }
        })
    }
  }

  const handleResend = () => {
    postAxios(API_RE_REGISTER, { email: dataVerify.email })
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
        setCheckResend(false)
        toast.info(res.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogoutOTP = () => {
    postAxios(API_LOGOUT_VERIFY, { user_id: dataVerify.user_id })
      .then((res: any) => {
        localStorage.removeItem(VERIFY_ID)
        toast.success(res.message)
        setTimeout(() => route.replace(LOGIN), 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AuthLayout title="Verify">
      <div className="w-[100%]">
        <div className="font-bold text-[30px] text-center text-white">Login</div>
        <form className="" onSubmit={handleSubmit(handleVerify)}>
          <div className="flex flex-col gap-[15px]">
            <div className="text-white text-[20px]">OTP Token :</div>
            <input
              {...register('OTP_token')}
              placeholder="Please enter your email"
              className="w-[100%] pl-[10px] py-[5px]"
            />
          </div>
          {checkResend ? (
            <div className="underline cursor-pointer text-white pt-[20px]" onClick={handleResend}>
              Resend
            </div>
          ) : (
            <>
              {second !== 0 && (
                <div className="text-white pt-[20px]">
                  You have <span className="text-red-600">{second}</span>s left to verify
                </div>
              )}
              <div className="verify-container-content-error">{error && 'Your OTP is not true'}</div>
            </>
          )}
          <div>
            <button type="submit" className="w-[100%] text-center py-[5px] bg-white mt-[20px]">
              Verify
            </button>
            <button className="w-[100%] text-center py-[5px] bg-white mt-[20px]" onClick={handleLogoutOTP}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Verify
