/* eslint-disable @next/next/no-img-element */
import { MOVIE_ID, USER_INFO, VERIFY_ID } from '@config/const'
import { API_TICKET_ORDER } from '@config/endpointApi'
import { bindParams, isLogin } from '@config/function'
import { LOGIN, PAYMENT } from '@config/path'
import useSeatOfRoomQuery from '@hooks/useSeatOfRoomQuery'
import useShowtimeDetailQuery from '@hooks/useShowtimeDetailQuery'
import useTicketByShowtimeQuery from '@hooks/useTicketByShowtimeQuery'
import BouncingLoader from '@src/common/BouncingLoader'
import { postAxios } from '@utils/Http'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const ShowtimeDetail = () => {
  const route = useRouter()
  const [selectedSeat, setSelectedSeat] = useState<Object[]>([])
  const [seatTicket, setSeatTicket] = useState<any>([])
  const [selectMoney, setSelectMoney] = useState<string[]>([])
  const [defaultSeat, setDefaultSeat] = useState<string[]>([])
  const [totalMoney, setTotalMoney] = useState(0)
  const id = Number(route.query?.id)

  const { data: showtime, isLoading } = useShowtimeDetailQuery(id)

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

      const seatFilter = selectSeats.filter((seat: any) => seat !== JSON.parse(value)?.id)

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
    }
    postAxios(API_TICKET_ORDER, params)
      .then((res: any) => {
        toast.success(res?.message)
        localStorage.setItem(VERIFY_ID, JSON.stringify(seatTicket))
        localStorage.setItem(MOVIE_ID, showtime?.movie?.id)
        setTimeout(() => {
          route.push(bindParams(PAYMENT, { id }))
        }, 1000)
      })
      .catch((err: any) => {
        toast.error(err?.message)
      })
  }

  if (isLoading) return <BouncingLoader />

  return (
    <div className="w-[65%] m-auto mt-[30px]">
      <div className="flex justify-center lg:justify-between flex-wrap">
        <div className="text-[22px] font-bold">
          <span className="text-red-600">Rạp: </span>
          {showtime?.room?.name}
        </div>
        <div className="text-[22px] font-bold">
          <span className="text-red-600">Ngày chiếu: </span>
          {showtime?.show_date}
        </div>
        <div className="text-[22px] font-bold">
          <span className="text-red-600">Thời gian chiếu: </span>
          {showtime?.show_time}
        </div>
      </div>
      <div className="flex mt-[50px] xl:mt-[30px] justify-center md:justify-evenly flex-wrap items-center">
        <div className="w-[200px]">
          <img src={showtime?.movie?.poster} alt={showtime?.movie?.poster} className="w-[100%]" />
          <div className="text-center mt-[10px] text-[20px]">Tên phim: {showtime?.movie?.name}</div>
        </div>
        <div className="pt-[50px] xl:pt-0">
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
                      className="w-[100%] h-[100%] opacity-20 cursor-pointer"
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
        <div className="w-[150px]">Tổng số tiền: {totalMoney}</div>
        {isLogin() ? (
          <button
            className="py-[5px] px-[20px] bg-black text-white"
            disabled={totalMoney === 0 && true}
            onClick={handleOrderTicket}
          >
            Buy
          </button>
        ) : (
          <Link href={LOGIN}>
            <a className="py-[5px] px-[20px] bg-black text-white">Login</a>
          </Link>
        )}
      </div>
    </div>
  )
}
