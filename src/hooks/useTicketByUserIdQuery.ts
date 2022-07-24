import { useQuery } from 'react-query'
import { API_TICKET_SHOWTIME, API_TICKET_USER_ID } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getTicket = async ({ queryKey }: any) => {
  const [_, id, limit, page] = queryKey
  const params: any = { user_id: id, limit, page }

  const { data }: any = await getAxios(API_TICKET_USER_ID, params)

  return data
}

const useTicketByUserIdQuery = (params: any) => {
  return useQuery(['ticket_showtime', ...params], getTicket, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useTicketByUserIdQuery
