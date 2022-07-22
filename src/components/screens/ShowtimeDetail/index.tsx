/* eslint-disable @next/next/no-img-element */
import { USER_INFO, VERIFY_ID } from '@config/const'
import { API_TICKET_ORDER } from '@config/endpointApi'
import { bindParams } from '@config/function'
import { PAYMENT } from '@config/path'
import useSeatOfRoomQuery from '@hooks/useSeatOfRoomQuery'
import useShowtimeDetailQuery from '@hooks/useShowtimeDetailQuery'
import useTicketByShowtimeQuery from '@hooks/useTicketByShowtimeQuery'
import { postAxios } from '@utils/Http'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ShowtimeDetail = () => {
  const route = useRouter()
  const [selectedSeat, setSelectedSeat] = useState<Object[]>([])
  const [seatTicket, setSeatTicket] = useState<any>([])
  const [selectMoney, setSelectMoney] = useState<string[]>([])
  const [defaultSeat, setDefaultSeat] = useState<string[]>([])
  const [totalMoney, setTotalMoney] = useState(0)
  const id = Number(route.query?.id)

  const { data: showtime } = useShowtimeDetailQuery(id)

  const { data: seat_room } = useSeatOfRoomQuery(showtime?.room?.id)

  const { data: ticket_showtime } = useTicketByShowtimeQuery([id])

  useEffect(() => {
    ticket_showtime?.map((ticket: any) => {
      setDefaultSeat((prev: any) => [...prev, ticket?.seats_id])
    })
  }, [ticket_showtime])

  const handleSelectSeat = (e: any) => {
    const { value, checked } = e.target

    if (checked) {
      setSeatTicket((prev: any) => [...prev, JSON.parse(value)])
      setSelectedSeat((prev: any) => [...prev, JSON.parse(value).id])
      setSelectMoney((prev: any) => [...prev, JSON.parse(value).money])
      setTotalMoney(totalMoney + JSON.parse(value).money)
    } else {
      const selectSeats = [...selectedSeat]
      const selectMoneys = [...selectMoney]
      const seatTickets = [...seatTicket]

      const seatFilter = selectSeats.filter((seat: any) => seat?.id !== JSON.parse(value)?.id)

      const moneyFilter = selectMoneys.filter((money: any) => money !== JSON.parse(value)?.money)

      const seatTicketFilter = seatTickets.filter((seat) => seat?.id !== JSON.parse(value)?.id)

      setSelectedSeat(seatFilter)
      setSelectMoney(moneyFilter)
      setSeatTicket(seatTicketFilter)
      setTotalMoney(totalMoney - JSON.parse(value).money)
    }
  }

  const handleOrderTicket = () => {
    const params = {
      showtime_id: id,
      seats: selectedSeat.join(','),
      confirm: 0,
      money: selectMoney.join(','),
      user_id: JSON.parse(localStorage.getItem(USER_INFO) || '').id,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    postAxios(API_TICKET_ORDER, params)
      .then((res: any) => {
        toast.success(res?.message)
        localStorage.setItem(VERIFY_ID, JSON.stringify(seatTicket))
        setTimeout(() => {
          route.push(bindParams(PAYMENT, { id }))
        }, 1000)
      })
      .catch((err: any) => {
        toast.error(err?.message)
      })
  }

  return (
    <div className="w-[65%] m-auto mt-[30px]">
      <div className="flex justify-between">
        <div>Rạp: {showtime?.room?.name}</div>
        <div>Ngày chiếu: {showtime?.show_date}</div>
        <div>Thời gian chiếu: {showtime?.show_time}</div>
      </div>
      <div className="flex mt-[30px] justify-center md:justify-evenly flex-wrap items-center">
        <div className="w-[200px]">
          <img src={showtime?.movie?.poster} alt={showtime?.movie?.poster} className="w-[100%]" />
          <div className="text-center mt-[10px]">Tên phim: {showtime?.movie?.name}</div>
        </div>
        <div>
          <div>
            <img src="/images/screen_room.png" alt="screen" />
          </div>
          <div className="w-[430px] m-auto mt-[30px] flex flex-wrap gap-y-[10px] justify-between">
            {seat_room?.map((seat: any) => {
              if (defaultSeat?.includes(seat?.id)) {
                return (
                  <div key={seat?.id} className="w-[40px] h-[40px] relative cursor-pointer">
                    <input
                      value={JSON.stringify(seat)}
                      onChange={handleSelectSeat}
                      className="w-[100%] h-[100%] opacity-0 cursor-pointer"
                      disabled
                      type="checkbox"
                    />
                    <img
                      src="/images/seat-checked.png"
                      alt="seat booked"
                      className="absolute z-[-1] w-[100%] h-[100%] top-0 cursor-pointer"
                    />
                  </div>
                )
              } else {
                return (
                  <div key={seat?.id} className="w-[40px] h-[40px] relative cursor-pointer">
                    <input
                      value={JSON.stringify(seat)}
                      onChange={handleSelectSeat}
                      className="w-[100%] h-[100%] opacity-0 cursor-pointer"
                      type="checkbox"
                    />
                    <img
                      src="/images/seat.png"
                      alt="seat booked"
                      className="absolute z-[-1] w-[100%] h-[100%] top-0 cursor-pointer"
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-[50px]">
        <div>Tổng số tiền: {totalMoney}</div>
        <button
          className="py-[5px] px-[20px] bg-black text-white"
          disabled={totalMoney === 0 && true}
          onClick={handleOrderTicket}
        >
          Mua ve
        </button>
      </div>
    </div>
  )
}

export default ShowtimeDetail
