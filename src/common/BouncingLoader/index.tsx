export default function BouncingLoader() {
  return (
    <div className="flex justify-center mt-[50px]">
      <div className="dot animate-loader"></div>
      <div className="dot animate-loader animation-delay-200"></div>
      <div className="dot animate-loader animation-delay-400"></div>
    </div>
  )
}
