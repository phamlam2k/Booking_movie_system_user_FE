import { MOVIE_ID, USER_INFO, VERIFY_ID } from '@config/const'
import { API_MOVIE_VIEWER, API_TICKET_DELETE, API_TICKET_PAY } from '@config/endpointApi'
import { bindParams, isVerify } from '@config/function'
import { HOME, SHOWTIME_DETAIL, TICKET } from '@config/path'
import useMovieDetailQuery from '@hooks/useMovieDetailQuery'
import useTicketCheckQuery from '@hooks/useTicketCheckQuery'
import BouncingLoader from '@src/common/BouncingLoader'
import { postAxios } from '@utils/Http'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { toast } from 'react-toastify'

export const Payment = () => {
  const [userInfo, setUserInfo] = useState<any>([])
  const route = useRouter()
  const [seat, setSeat] = useState([])
  const [viewer, setViewer] = useState()
  const [movieId, setMovieId] = useState<any>()
  const [listSeat, setListSeat] = useState<any[]>([])
  const [time, setTime] = useState(0)
  const [money, setMoney] = useState(0)
  const seatCount = listSeat?.join(',')

  const [scriptLoaded, setScriptLoaded] = useState(false)
  const { data: ticketCheck, isLoading } = useTicketCheckQuery(userInfo?.id)
  const { data: movieDetail } = useMovieDetailQuery(movieId)

  useEffect(() => {
    let m = 0
    if (seat) {
      seat?.map((ticket: any) => {
        m += ticket?.money
        setListSeat((prev: any) => [...prev, ticket?.id])
      })
    }
    setMoney(m)
  }, [seat])

  useEffect(() => {
    if (movieDetail) {
      setViewer(movieDetail?.viewer)
    }
  }, [movieDetail])

  const handleCancelTicket = () => {
    const params = {
      id_count: seatCount,
      showtime: route?.query?.id,
    }

    postAxios(API_TICKET_DELETE, params)
      .then((res: any) => {
        toast.warning(res?.message)
        localStorage.removeItem(VERIFY_ID)
        setTimeout(() => {
          route.push(bindParams(SHOWTIME_DETAIL, { id: Number(route?.query?.id) }))
        })
      })
      .catch((err: any) => {
        toast.error(err?.message)
      })
  }

  useEffect(() => {
    if (ticketCheck) {
      if (moment(ticketCheck[0]?.expired_in).unix() - moment().unix() > 0) {
        const myInterval = setInterval(() => {
          if (moment(ticketCheck[0]?.expired_in).unix() - moment().unix() === 0) {
            handleCancelTicket()
            clearInterval(myInterval)
          }
          setTime(moment(ticketCheck[0]?.expired_in).unix() - moment().unix())
        }, 1000)
        return () => {
          clearInterval(myInterval)
        }
      }
    }
  }, [ticketCheck])

  useEffect(() => {
    if (!isVerify()) {
      route.push(HOME)
    }
    addPaypalScript()
    if (typeof window !== undefined) {
      setUserInfo(JSON.parse(localStorage.getItem(USER_INFO) || '{}'))
      setSeat(JSON.parse(localStorage.getItem(VERIFY_ID) || '[]'))
      setMovieId(localStorage.getItem(MOVIE_ID))
    }
  }, [])

  const handlePayment = () => {
    const params = {
      confirm: 1,
      id_count: seatCount,
      showtime: route?.query?.id,
    }

    let viewerCount: any = viewer

    postAxios(API_TICKET_PAY, params)
      .then(() => {
        postAxios(API_MOVIE_VIEWER, {
          user_id: movieId,
          viewer: viewerCount + ticketCheck?.length,
        })
      })
      .then((res: any) => {
        toast.success(res?.message)
        setTimeout(() => {
          route.push(TICKET)
        }, 1000)
      })
      .catch((err) => {
        toast.error(err?.message)
      })
  }

  const addPaypalScript = () => {
    let window: any
    if (window?.paypal) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')

    script.src =
      'https://www.paypal.com/sdk/js?client-id=AZFbfQds6gZO-eyM_x3qUlL1ZeDgSOHo0HI63NIY_pKeK_n-mmiRZQi5HmpfcdUWG4esu_C9OKkT9jvN'

    script.type = 'text/javascript'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)
  }

  if (isLoading) return <BouncingLoader />

  return (
    <div className="w-[65%] mt-[50px] m-auto">
      <div className="text-center text-[25px] font-bold">Vui lòng check ticket trước khi thanh toán</div>
      <div className="flex justify-between mt-[20px]">
        <div>
          {ticketCheck?.map((ticket: any) => {
            return (
              <div key={ticket?.id} className="border-2 border-black py-4 px-5">
                <div>ID: {ticket?.id}</div>
                <div>
                  Seat: {ticket?.seat?.row}
                  {ticket?.seat?.order}
                </div>
                <div>ShowDate: {ticket?.showtime?.show_date}</div>
                <div>ShowTime: {ticket?.showtime?.show_time}</div>
                <div>Money: {ticket?.money}$</div>
              </div>
            )
          })}
        </div>
        <div className="w-[300px]">
          <div>Tổng số tiền bạn sẽ trả: {money}$</div>
          <div>
            You have left <span className="text-red-700">{time}</span> second
          </div>
          <div
            className="w-[100%] mt-[20px] py-2 bg-red-600 text-[18px] text-white cursor-pointer text-center"
            onClick={handleCancelTicket}
          >
            Hủy
          </div>
          <div className="py-[10px] text-[20px]">Phương thức thanh toán:</div>
          <PayPalButton
            amount={money}
            onSuccess={handlePayment}
            onError={() => {
              console.log('err')
            }}
          />
        </div>
      </div>
    </div>
  )
}
