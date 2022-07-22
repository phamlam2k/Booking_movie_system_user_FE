import ReactPlayer from 'react-player'

interface Props {
  url: string
  width: string
  height: string
  loop?: boolean
  controls?: boolean
}

export const VideoModal = ({ url, loop, controls, width, height }: Props) => {
  return <ReactPlayer url={url} loop={loop} controls={controls} width={width} height={height} />
}
