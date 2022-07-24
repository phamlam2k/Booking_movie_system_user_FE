import { useQuery } from 'react-query'
import { API_TICKET_SHOWTIME, API_USER_PROFILE } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getUserProfile = async () => {
  const params = {}

  const data = await getAxios(API_USER_PROFILE, params)

  return data
}

const useUserProfileQuery = () => {
  return useQuery(['user_profile'], getUserProfile, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useUserProfileQuery
