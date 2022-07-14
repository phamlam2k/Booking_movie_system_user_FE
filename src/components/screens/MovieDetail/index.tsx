/* eslint-disable @next/next/no-img-element */
import useMovieDetailQuery from '@hooks/useMovieDetailQuery'
import ReactPlayer from 'react-player'

const MovieDetail = ({ id }: { id: string | string[] | undefined }) => {
  const { data: movie_detail } = useMovieDetailQuery(id)

  return (
    <div className="w-[65%] mt-[30px] m-auto">
      <div className="text-[30px] font-bold">Nội Dung Phim</div>
      <div className="flex gap-[20px] mt-[30px]">
        <div>
          <img src={movie_detail?.poster} alt={movie_detail?.name} className="w-[200px] object-contain" />
          <div className="w-[100%] text-center mt-[20px] rounded-md text-white py-2 bg-red-500 cursor-pointer">
            Mua vé
          </div>
        </div>
        <div>
          <div className="text-[25px] font-bold border-b-2 border-black py-2 px-1">{movie_detail?.name}</div>
          <div className="p-1">Đạo diễn: {movie_detail?.director}</div>
          <div className="p-1">Diễn viên: {movie_detail?.actor}</div>
          <div className="p-1">Thể loại: {movie_detail?.type_of_movie}</div>
          <div className="p-1">Khởi chiếu: {movie_detail?.start_date}</div>
          <div className="p-1">Thời lượng: {movie_detail?.range_of_movie} tiếng</div>
          <div className="p-1">Cấm độ tuổi dưới {movie_detail?.range_age}</div>
        </div>
      </div>
      <div className="mt-[20px]">
        <span className="text-[20px]">Miêu tả:</span> {movie_detail?.description}
      </div>
      <div className="mt-[20px]">
        <div className="text-[20px] font-bold py-2">Trailer: </div>
        <ReactPlayer url={movie_detail?.trailer} controls={true} />
      </div>
      <div className="mt-[20px]">
        <div className="font-bold text-[20px]">Comment: </div>
      </div>
    </div>
  )
}

export default MovieDetail
