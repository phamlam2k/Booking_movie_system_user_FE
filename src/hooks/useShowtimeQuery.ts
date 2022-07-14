import { useQuery } from 'react-query'
import { API_ADVERTISEMENT, API_SHOWTIME } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getShowtime = async ({ queryKey }: any) => {
  const [_, limit, keywordShowtime, page, date, time] = queryKey
  const params: any = { limit, keyword: keywordShowtime, page, date, time }

  const { data }: any = await getAxios(API_SHOWTIME, params)

  return data
}

const useShowtimeQuery = (params: any) => {
  return useQuery(['showtime', ...params], getShowtime, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useShowtimeQuery
