/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Slider from 'react-slick'
import useAdvertisementQuery from '../../../hooks/useAdvertisementQuery'

const settings = {
  dots: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const LeftPanel = () => {
  const { data: advertise } = useAdvertisementQuery()
  const data = advertise?.data
  console.log(data)
  return (
    <div className="w-[50%] overflow-hidden pt-[90px] px-[30px] h-[400px]">
      <Slider {...settings}>
        {data?.map((items: any) => (
          <div key={items?.id} className="w-[100%]">
            <img src={items?.image} alt={items?.name} className="object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default LeftPanel
