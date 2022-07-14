import type { NextPage } from 'next'
import { AuthLayout } from '../src/common/AuthLayout'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { LOGIN, VERIFY } from '../src/config/path'
import { postAxios } from '../src/utils/Http'
import { API_REGISTER } from '../src/config/endpointApi'
import { ERR_BAD_REQUEST, VERIFY_ID } from '../src/config/const'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

type DataForm = {
  full_name: string
  email: string
  password: string
  confirmPassword: string
  role?: number
}

const schema = yup.object().shape({
  full_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const Register: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleRegister = (data: DataForm) => {
    data.role = 1

    postAxios(API_REGISTER, data)
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
        toast.success('Register successfully!')
        setTimeout(() => {
          router.replace(VERIFY)
        }, 1500)
      })
      .catch((err) => {
        if (err.code === ERR_BAD_REQUEST) {
          const { response } = err
          if (response.status === 401) {
            toast.error(response.data.message)
          }
        }
      })
  }

  return (
    <AuthLayout title="Register">
      <div className="w-[100%]">
        <div className="font-bold text-[30px] text-center text-white">Register</div>
        <form className="" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-[15px]">
            <div className="text-white text-[20px]">Full Name :</div>
            <input
              {...register('full_name')}
              placeholder="Please enter your full name"
              className="w-[100%] pl-[10px] py-[5px]"
            />
            <div className="text-red-400">{errors.full_name && <span>Please enter full name</span>}</div>
          </div>
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
          <div className="flex flex-col gap-[15px] mt-[10px]">
            <div className="text-white text-[20px]">Confirm Password :</div>
            <input
              {...register('confirmPassword')}
              placeholder="Please enter your password"
              type={'password'}
              className="w-[100%] pl-[10px] py-[5px]"
            />
            <div className="text-red-400">{errors.confirmPassword && <span>Not match to password</span>}</div>
          </div>
          <div className="flex justify-between mt-[10px] text-white">
            <Link href={LOGIN}>
              <a>Are you have account?</a>
            </Link>
          </div>
          <button type="submit" className="w-[100%] text-center py-[5px] bg-white mt-[20px]">
            Register
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register
