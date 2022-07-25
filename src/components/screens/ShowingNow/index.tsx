/* eslint-disable @next/next/no-img-element */
import { bindParams } from '@config/function'
import { SHOWTIME_DETAIL } from '@config/path'
import useNowShowingQuery from '@hooks/useNowShowingQuery'
import { useRouter } from 'next/router'

export const NowShowing = () => {
  const route = useRouter()
  const { data: nowShowing } = useNowShowingQuery()

  const handleGoToShowtime = (id: any) => {
    route.push(bindParams(SHOWTIME_DETAIL, { id }))
  }
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
                    Image
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Name of Movie
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    ShowTime
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Range Time
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Buy
                  </th>
                </tr>
              </thead>
              <tbody>
                {nowShowing?.map((row: any) => {
                  return (
                    <tr key={row?.id} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row?.id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img src={row?.movie?.poster} alt={row?.movie?.name} className="w-[100px] object-cover" />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.movie?.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{row?.show_time}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row?.movie?.range_of_movie > 2
                          ? `${row?.movie?.range_of_movie} minutes`
                          : `${row?.movie?.range_of_movie} hours`}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className="w-[80px] py-[2px] bg-red-500 text-white"
                          onClick={() => handleGoToShowtime(row?.id)}
                        >
                          Buy
                        </button>
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
