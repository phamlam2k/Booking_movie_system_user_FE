import { bindParams } from '@config/function'
import { useQuery } from 'react-query'
import { API_SHOWTIME_DETAIL } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getShowtime = async (id: any) => {
  const { data }: any = await getAxios(bindParams(API_SHOWTIME_DETAIL, { id }), {})

  return data
}

const useShowtimeDetailQuery = (id: any) => {
  return useQuery(['movie_detail'], () => getShowtime(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useShowtimeDetailQuery
