import { GrRotateLeft, GrRotateRight } from "react-icons/gr"
import { BsPlayFill, BsPauseFill } from "react-icons/bs"
import { useState, useRef, useEffect } from "react"
import Slider from "react-input-slider"

export default function AudioPlayer(props) {
  const audio = props.link

  const [isPlaying, setIsPlaying] = useState(false)
  const [state, setState] = useState({ x: 0, y: 0 });
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

  const toggePlayPause = () => {
    // const prevValue = isPlaying
    setIsPlaying(prev => !prev)
    if (isPlaying) {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const whilePlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime)
    setState(state => ({ ...state, x: audioPlayer.current.currentTime }))
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  useEffect(() => {
    if (!isPlaying) toggePlayPause()
    setIsPlaying(true)
  }, [audioPlayer?.current?.playing])


  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
  }, [audioPlayer?.current?.loadedmedadata, audioPlayer?.current?.readyState])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs/60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes

    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${returnedMinutes}:${returnedSeconds}`

  }

  const backThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime - 5
    setCurrentTime(audioPlayer.current.currentTime)
    setState(state => ({ ...state, x: audioPlayer.current.currentTime }))
  }

  const frontThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime + 5
    setCurrentTime(audioPlayer.current.currentTime)
    setState(state => ({ ...state, x: audioPlayer.current.currentTime }))
  }

  useEffect(() => {},[duration])

  return (
    <div className="">
      <audio ref={audioPlayer} src={audio} autoPlay />

      <div className="flex justify-center items-center">
        <button className="border-[1px] m-2 bg-white p-[1px] px-2 flex items-center justify-center cursor-pointer rounded-[50%] w-10 h-10" onClick={backThirty}><GrRotateLeft /></button>
        <button className="border-[1px] m-2 bg-white p-[1px] px-2 cursor-pointer rounded-[50%] w-14 h-14 flex items-center justify-center" onClick={toggePlayPause}>
          {isPlaying ? <BsPauseFill className="text-[22px]" /> : <BsPlayFill className="text-[22px]" />}
        </button>
        <button className="border-[1px] m-2 bg-white p-[1px] px-2 flex items-center justify-center cursor-pointer rounded-[50%] w-10 h-10" onClick={frontThirty}><GrRotateRight /></button>
      </div>

      <div className="flex">
        <div className="text-white">{calculateTime(currentTime)} &nbsp;&nbsp;</div>
        <div>
        <Slider
          axis="x"
          xmax={duration}
          x={state.x}
          onChange={({ x }) => {
            setState(state => ({ ...state, x }))
            audioPlayer.current.currentTime = x
            setCurrentTime(x)
          }}

          styles={{
            active: {
              backgroundColor: "#fa5056"
            },
            track: {
              width: "70vw",
              backgroundColor: "#555"
            },
            thumb: {
              active: {
                backgroundColor: "black"
              }
            }
          }}
        />
        </div>
        <div className="text-white ">&nbsp;&nbsp;{isNaN(duration) ? "00:00" : calculateTime(duration)}</div>
      </div>



    </div>
  )
}
