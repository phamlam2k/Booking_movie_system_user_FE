import { API_CHANGE_PASSWORD, API_LOGOUT, API_USER_PROFILE } from '@config/endpointApi'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { getAxios, postAxios } from '@utils/Http'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { LOGIN } from '@config/path'
import { AUTH_TOKEN, USER_INFO } from '@config/const'

interface USER_PROFILE {
  address: string | null
  birth: string | null
  confirm: number
  confirmation_code: string
  confirmation_code_expired_in: string
  created_at: string
  email: string
  email_verified_at: string | null
  full_name: string
  gender: number | null
  id: number
  number_phone: string | null
  role: number
  updated_at: string
}

type DataForm = {
  id: number
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const params = {}
    getAxios(API_USER_PROFILE, params).then((res) => {
      setUserInfo(res)
    })
  }, [])

  const handleLogout = () => {
    postAxios(API_LOGOUT, {})
      .then(() => {
        localStorage.removeItem(USER_INFO)
        localStorage.removeItem(AUTH_TOKEN)
        route.push(LOGIN)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangePassword = (value: any) => {
    value.user_id = userInfo?.id
    const params = value
    postAxios(API_CHANGE_PASSWORD, params)
      .then((res: any) => {
        localStorage.removeItem(USER_INFO)
        localStorage.removeItem(AUTH_TOKEN)
        toast.success(res.message)
        setTimeout(() => {
          route.push(LOGIN)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="w-[75%] m-auto mt-[30px] flex justify-evenly">
      <div>
        <div className="text-center text-[22px] font-bold">Information</div>
        <div>ID: {userInfo?.id}</div>
        <div>Name: {userInfo?.full_name}</div>
        <div>Address: {userInfo?.address}</div>
        <div>Birth: {userInfo?.birth}</div>
        <div>Gender: {userInfo?.gender === 0 ? 'Male' : userInfo?.gender === 1 ? 'Female' : null}</div>
        <div>Email: {userInfo?.email}</div>
        <div>Number Phone: {userInfo?.number_phone}</div>
      </div>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="text-center text-[22px] font-bold">Change Password</div>
        <div>
          <div>Password: </div>
          <input placeholder="Enter password you want to change" {...register('password')} />
          <div className="text-red-400">{errors.password && <span>Please input the password</span>}</div>
        </div>
        <div>
          <div>Confirm Password: </div>
          <input placeholder="Enter confirm password" {...register('confirmPassword')} />
          <div className="text-red-400">{errors.confirmPassword && <span>Not match to password</span>}</div>
        </div>
        <div>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default UserProfile
