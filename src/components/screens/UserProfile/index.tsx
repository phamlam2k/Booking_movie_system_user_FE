/* eslint-disable @next/next/no-img-element */
import { API_CHANGE_PASSWORD, API_LOGOUT, API_UPDATE_PROFILE, API_USER_PROFILE } from '@config/endpointApi'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { getAxios, postAxios } from '@utils/Http'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { LOGIN } from '@config/path'
import { AUTH_TOKEN, USER_INFO } from '@config/const'
import useUserProfileQuery from '@hooks/useUserProfileQuery'
import { useQueryClient } from 'react-query'

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

type DataUpdateProfile = {
  full_name: string
  number_phone: string
  address: string
  birth: string
  gender: string
}

const schemaForgotPassword = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const schemaUpdateProfile = yup.object().shape({
  full_name: yup.string().required(),
  number_phone: yup.string().required(),
  address: yup.string().required(),
  birth: yup.string().required(),
  gender: yup.string().required(),
})

const UserProfile = () => {
  const queryClient = useQueryClient()
  const { data: userInfo }: any = useUserProfileQuery()
  const [tab, setTab] = useState(1)
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onTouched',
    resolver: yupResolver(tab === 1 ? schemaUpdateProfile : schemaForgotPassword),
  })

  const handleChangeTab = (value: number) => {
    setTab(value)
  }

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

  const handleUpdateProfile = (value: any) => {
    value.user_id = userInfo?.id
    const params = value
    postAxios(API_UPDATE_PROFILE, params)
      .then((res: any) => {
        toast.success(res.message)
        queryClient.invalidateQueries(['user_profile'])
      })
      .catch(() => {})
  }

  return (
    <div className="w-[75%] m-auto mt-[30px] flex justify-evenly flex-wrap">
      <div className="border-2 border-black py-5 px-7 rounded-lg">
        <div className="text-center text-[24px] font-bold">Information</div>
        <div className="w-[200px] overflow-hidden rounded-full m-auto mt-[20px]">
          <img src="/images/default-user-image.png" alt="Default user image" className="w-[100%]" />
        </div>
        <div>ID: {userInfo?.id}</div>
        <div>Name: {userInfo?.full_name}</div>
        <div>Address: {userInfo?.address}</div>
        <div>Birth: {userInfo?.birth}</div>
        <div>Gender: {userInfo?.gender}</div>
        <div>Email: {userInfo?.email}</div>
        <div>Number Phone: {userInfo?.number_phone}</div>
      </div>
      <div className="border-2 border-black rounded-lg overflow-hidden mt-[20px] md:mt-0">
        <div className="flex">
          <div
            className={`cursor-pointer py-[5px] px-[10px] border-2 border-b-black border-r-black ${
              tab === 1 && 'bg-red-400 text-white'
            }`}
            onClick={() => handleChangeTab(1)}
          >
            Update Profile
          </div>
          <div
            className={`cursor-pointer py-[5px] px-[10px] border-2 border-b-black border-r-black ${
              tab === 2 && 'bg-red-400 text-white'
            }`}
            onClick={() => handleChangeTab(2)}
          >
            Change Password
          </div>
        </div>
        {tab === 1 ? (
          <form onSubmit={handleSubmit(handleUpdateProfile)} className="py-2 px-5">
            <div className="text-center text-[22px] font-bold">Update Profile</div>
            <div>
              <div>Full name: </div>
              <input
                placeholder="Enter full name"
                className="b"
                defaultValue={userInfo?.full_name}
                {...register('full_name')}
              />
              <div className="text-red-400">{errors.full_name && <span>Please input the full name</span>}</div>
            </div>
            <div>
              <div>Number Phone: </div>
              <input
                placeholder="Enter phone number"
                defaultValue={userInfo?.number_phone}
                {...register('number_phone')}
              />
              <div className="text-red-400">{errors.number_phone && <span>Please input the phone number</span>}</div>
            </div>
            <div>
              <div>Address: </div>
              <input placeholder="Enter phone number" defaultValue={userInfo?.address} {...register('address')} />
              <div className="text-red-400">{errors.number_phone && <span>Please input the phone address</span>}</div>
            </div>
            <div>
              <div>Birth: </div>
              <input
                placeholder="Enter full name you want to change"
                defaultValue={userInfo?.birth}
                type="date"
                {...register('birth')}
              />
              <div className="text-red-400">{errors.birth && <span>Please input the birth</span>}</div>
            </div>
            <div>
              <div>Gender: </div>
              <div className="flex gap-[5px] items-center">
                <input type={'radio'} value="male" {...register('gender')} />
                <div>Male</div>
              </div>
              <div className="flex gap-[5px] items-center">
                <input type={'radio'} value="male" {...register('gender')} />
                <div>Female</div>
              </div>
              <div className="text-red-400">{errors.gender && <span>Please input the gender</span>}</div>
            </div>
            <button type="submit" className="block m-auto w-[130px] text-white py-3 bg-blue-400 mt-[20px]">
              Update Profile
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleChangePassword)} className="py-2 px-5">
            <div className="text-center text-[22px] font-bold">Change Password</div>
            <div>
              <div>Password: </div>
              <input placeholder="Enter password you want to change" type={'password'} {...register('password')} />
              <div className="text-red-400">{errors.password && <span>Please input the password</span>}</div>
            </div>
            <div>
              <div>Confirm Password: </div>
              <input placeholder="Enter confirm password" type={'password'} {...register('confirmPassword')} />
              <div className="text-red-400">{errors.confirmPassword && <span>Not match to password</span>}</div>
            </div>
            <button className="block m-auto w-[130px] text-white py-3 bg-blue-400 mt-[20px]" type="submit">
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserProfile
