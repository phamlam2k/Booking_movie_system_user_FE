import { useQuery } from 'react-query'
import { API_ADVERTISEMENT } from '../config/endpointApi'
import { getAxios } from '../utils/Http'

const getAdvertisement = async () => {
  const params: any = { limit: 1000, keyword: '', page: 1 }

  const { data }: any = await getAxios(API_ADVERTISEMENT, params)

  return data
}

const useAdvertisementQuery = () => {
  return useQuery(['advertisement'], getAdvertisement, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAdvertisementQuery
