import { bindParams } from '@config/function'
import { SHOWTIME_DETAIL } from '@config/path'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const ShowtimeModal = ({ selectDate, handleSelectDate, showtime }: any) => {
  const [date, setDate] = useState<any>([])
  const AMOUNT_DATE = 11

  useEffect(() => {
    if (date.length < 8) {
      for (let i = 0; i < AMOUNT_DATE; i++) {
        setDate((prev: any) => [...prev, moment().add(i, 'days').format('YYYY-MM-DD')])
      }
    }
  }, [])

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
            <Link href={bindParams(SHOWTIME_DETAIL, { id: items?.id })} key={items?.id}>
              <a className="p-2 border-2 border-black cursor-pointer">{items?.show_time}</a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
