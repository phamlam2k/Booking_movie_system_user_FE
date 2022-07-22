import { useQuery } from 'react-query'
import { API_TICKET_SHOWTIME } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getTicket = async ({ queryKey }: any) => {
  const [_, id] = queryKey
  const params: any = { showtime_id: id }

  const { data }: any = await getAxios(API_TICKET_SHOWTIME, params)

  return data
}

const useTicketByShowtimeQuery = (params: any) => {
  return useQuery(['ticket_showtime', ...params], getTicket, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useTicketByShowtimeQuery
