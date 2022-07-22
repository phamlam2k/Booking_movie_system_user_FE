import { bindParams } from '@config/function'
import { useQuery } from 'react-query'
import { API_SEAT_OF_ROOM } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getSeat = async (id: any) => {
  const { data }: any = await getAxios(bindParams(API_SEAT_OF_ROOM, { id }), {})

  return data
}

const useSeatOfRoomQuery = (id: any) => {
  return useQuery(['seat_room'], () => getSeat(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useSeatOfRoomQuery
