import { useQuery } from 'react-query'
import { API_ADVERTISEMENT, API_MOVIES, API_SHOWTIME } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getMovie = async ({ queryKey }: any) => {
  const [_, limit, keyword, page] = queryKey
  const params: any = { limit, keyword, page }

  const { data }: any = await getAxios(API_MOVIES, params)

  return data
}

const useMovieQuery = (params: any) => {
  return useQuery(['movie', ...params], getMovie, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useMovieQuery
