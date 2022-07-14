import moment from 'moment'
import { useEffect, useState } from 'react'

const ShowtimeModal = ({ selectDate, handleSelectDate, showtime }: any) => {
  const [date, setDate] = useState<any>([])
  const AMOUNT_DATE = 11

  useEffect(() => {
    if (date.length < 8) {
      for (let i = 0; i < AMOUNT_DATE; i++) {
        setDate((prev: any) => [...prev, moment().add(i, 'days').format('YYYY-MM-DD')])
      }
    }
  }, [])

  console.log(showtime)

  return (
    <div>
      <div className="flex">
        {date.map((items: string, index: number) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectDate(items)}
              className={`p-2 ${items === selectDate && 'text-white bg-black'} cursor-pointer`}
            >
              {moment(items).format('DD-MM')}
            </div>
          )
        })}
      </div>
      <div className="mt-[10px]">Thời gian chiếu: </div>
      <div className="flex gap-[10px] mt-[10px]">
        {showtime?.map((items: any) => {
          return (
            <div key={items?.id} className="p-2 border-2 border-black">
              {items?.show_time}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowtimeModal
