import { USER_INFO } from '@config/const'
import useTicketByUserIdQuery from '@hooks/useTicketByUserIdQuery'
import { useEffect, useState } from 'react'

const Ticket = () => {
  const [id, setId] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const { data: tickets } = useTicketByUserIdQuery([id, limit, page])

  const data = tickets?.data
  const last_page = tickets?.last_page

  useEffect(() => {
    if (typeof window !== undefined) {
      setId(JSON.parse(localStorage.getItem(USER_INFO) || '{}').id)
    }
  }, [])

  return (
    <div className="flex flex-col w-[65%] m-auto mt-[50px]">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    #
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Seat
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    ShowDate
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    ShowTime
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Money
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Confirm
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row: any) => {
                  return (
                    <tr key={row?.id} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row?.id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.seat?.row}
                        {row?.seat?.order}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.showtime?.show_date}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.showtime?.show_time}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{row?.money} $</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.confirm === 1 ? 'Paid' : 'UnPaid'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Ticket
