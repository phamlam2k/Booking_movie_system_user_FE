import { bindParams } from '@config/function'
import { useQuery } from 'react-query'
import { API_TICKET_CHECK } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getTicket = async (id: any) => {
  const params = {}
  const { data }: any = await getAxios(bindParams(API_TICKET_CHECK, { id }), params)

  return data
}

const useTicketCheckQuery = (id: any) => {
  return useQuery(['ticket_check'], () => getTicket(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!id,
  })
}

export default useTicketCheckQuery
