import { useQuery } from 'react-query'
import { API_SHOWTIME, API_SHOWTIME_SHOWING_NOW } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getShowtime = async () => {
  const params = {}

  const { data }: any = await getAxios(API_SHOWTIME_SHOWING_NOW, params)

  return data
}

const useNowShowingQuery = () => {
  return useQuery(['now_showing'], getShowtime, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useNowShowingQuery
