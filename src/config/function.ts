import { AUTH_TOKEN, USER_INFO, VERIFY_ID } from './const'

export const isLogin = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(USER_INFO) && !!localStorage.getItem(AUTH_TOKEN)
  }
  return
}

export const isVerify = () => {
  return !!localStorage.getItem(VERIFY_ID)
}

export const bindParams = (url: string, params: { id: number }) => {
  const { id }: { id: number } = params
  const string = url.replace(':id', String(id))

  return string
}
