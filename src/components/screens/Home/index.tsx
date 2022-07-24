/* eslint-disable @next/next/no-img-element */
import { bindParams } from '@config/function'
import { MOVIE_DETAIL } from '@config/path'
import useMovieQuery from '@hooks/useMovieQuery'
import useShowtimeQuery from '@hooks/useShowtimeQuery'
import { IconPlay } from '@src/common/Icons'
import { VideoModal } from '@src/widget/VideoModal'
import moment from 'moment'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'

const CustomModal = dynamic<any>(() => import('@src/common/CustomModal').then((mod) => mod.CustomModal), {
  ssr: false,
})

const ShowtimeModal = dynamic<any>(() => import('@src/widget/ShowtimeModal').then((mod) => mod.ShowtimeModal), {
  ssr: false,
})

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenShowtime, setIsOpenShowtime] = useState(false)
  const [url, setUrl] = useState<string>('')
  const [keyword] = useState('')
  const [keywordShowtime, setKeywordShowtime] = useState('')
  const [selectDate, setSelectDate] = useState(moment().format('YYYY-MM-DD'))
  const [time] = useState('')
  const [limit, setLimit] = useState(5)
  const [page] = useState(1)

  const { data: movies } = useMovieQuery([limit, keyword, page])
  const { data: showtime } = useShowtimeQuery([limit, keywordShowtime, page, selectDate, time])

  const data = movies?.data
  const totalMovies = movies?.total

  const handleShowMoreMovies = () => {
    setLimit(limit + 5)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSelectDate = (value: string) => {
    setSelectDate(value)
  }

  const handleOpenModal = (url: string) => {
    setUrl(url)
    setIsOpen(true)
  }

  const handleCloseShowtimeModal = () => {
    setIsOpenShowtime(false)
  }

  const handleOpenShowtimeModal = (value: string) => {
    setKeywordShowtime(value)
    setIsOpenShowtime(true)
  }

  return (
    <div className="w-[65%] m-auto">
      <div className="text-center pt-[30px] text-[25px] font-bold">Movies in July</div>
      <div className="flex gap-[30px] mt-[30px] flex-wrap justify-center">
        {data?.map((movie: any) => {
          return (
            <div key={movie.id} className="relative w-[220px] h-fit group cursor-pointer">
              <img src={movie.poster} alt={movie.name} className="w-[100%] h-[300px] object-cover" />
              <div
                className="absolute top-[50%] left-[50%] text-white translate-x-[-50%] translate-y-[-50%] hidden group-hover:block"
                onClick={() => handleOpenModal(movie.trailer)}
              >
                <IconPlay className="w-[48px] h-[48px]" />
              </div>
              <div className="absolute bottom-0 bg-[#000000bd] text-white w-[100%] hidden group-hover:block">
                <div className="text-center mt-[10px]">{movie.name}</div>
                <div className="flex justify-evenly py-[10px]">
                  <Link href={bindParams(MOVIE_DETAIL, { id: movie.id })}>
                    <a className="bg-red-400 py-[5px] px-[20px] rounded-md">Detail</a>
                  </Link>
                  <button
                    className="bg-red-400 py-[5px] px-[20px] rounded-md"
                    onClick={() => handleOpenShowtimeModal(movie.name)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {limit < totalMovies && (
        <div
          className="w-[100px] mt-[20px] py-[5px] m-auto text-center border-2 border-black cursor-pointer"
          onClick={handleShowMoreMovies}
        >
          See more
        </div>
      )}
      <CustomModal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <VideoModal url={url} width={'600px'} height={'350px'} controls={true} />
      </CustomModal>
      <CustomModal isOpen={isOpenShowtime} onRequestClose={handleCloseShowtimeModal}>
        <ShowtimeModal selectDate={selectDate} handleSelectDate={handleSelectDate} showtime={showtime?.data} />
      </CustomModal>
    </div>
  )
}
