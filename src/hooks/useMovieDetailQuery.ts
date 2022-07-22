import { bindParams } from '@config/function'
import { useQuery } from 'react-query'
import { API_MOVIE_DETAIL } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getMovie = async (id: any) => {
  const { data }: any = await getAxios(bindParams(API_MOVIE_DETAIL, { id }), {})

  return data
}

const useMovieDetailQuery = (id: any) => {
  return useQuery(['movie_detail'], () => getMovie(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useMovieDetailQuery
