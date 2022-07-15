/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-black w-screen mt-[50px]">
      <div className="w-[65%] m-auto flex py-[20px] items-center gap-[20px]">
        <img src="/images/logo-white.png" alt="logo-white" />
        <div className="text-white">
          <div>Trường đại học khoa học và công nghệ Hà Nội</div>
          <div>
            Địa chỉ: Tòa nhà A21, Viện Hàn Lâm Khoa học và Công nghệ Việt Nam, 18 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
          </div>
          <div>Điện thoại: +84-24 37 91 69 60</div>
          <Link href="mailto:lampnm.ba9030@usth.edu.vn">
            <a>Email: lampnm.ba9030@usth.edu.vn</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
