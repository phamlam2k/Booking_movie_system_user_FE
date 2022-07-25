import useNowShowingQuery from '@hooks/useNowShowingQuery'

export const NowShowing = () => {
  const { data: nowShowing } = useNowShowingQuery()
  console.log(nowShowing)
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
                {nowShowing?.map((row: any) => {
                  return (
                    <tr key={row?.id} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
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
