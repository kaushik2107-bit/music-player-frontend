import { GrRotateLeft, GrRotateRight } from "react-icons/gr"
import { BsPlayFill, BsPauseFill, BsVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { RxLoop } from "react-icons/rx"
import { useState, useRef, useEffect } from "react"
import Slider from "react-input-slider"
import axios from "axios"

export default function AudioPlayer(props) {
  const audio = props.link

  const [isPlaying, setIsPlaying] = useState(false)
  const [state, setState] = useState({ x: 0, y: 0 });
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState({ x: 100, y: 0 });


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

  const handleMute = () => {
    if (volume.x === 0) {
      setVolume(state => ({...state, x: 20}))
      audioPlayer.current.volume = 20/100
    } else {
      setVolume(state => ({...state, x: 0}))
      audioPlayer.current.volume = 0/100
    }
  }

  useEffect(() => {
    setIsPlaying(true)
    audioPlayer.current.play()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }, [props.link])

  const [isLiked, setIsLiked] = useState(false)

  const fetchLike = async() => {
    const check = await axios.post('https://musicplayer-production-5463.up.railway.app/islike', {
      email: JSON.parse(localStorage.getItem("muzic"))?.email,
      ...props.data
    })
    setIsLiked(prev => check.data.check)
  }

  useEffect(() => {
    fetchLike()
  }, [props?.data])

  const toggleLike = async () => {
    const check = isLiked
    setIsLiked(prev => !prev)
    const block = {
      email: JSON.parse(localStorage.getItem("muzic")).email,
      ...props.data
    }

    if (check == false) {
      if (props.data.image.length) await axios.post("https://musicplayer-production-5463.up.railway.app/setlike", block)
    } else {
      if (props.data.image.length) await axios.post("https://musicplayer-production-5463.up.railway.app/removelike", block)
    }

  }

  return (
    <div className="">
      <audio ref={audioPlayer} src={audio} autoPlay loop={props.loop} />

      <div className="flex justify-center items-center">
        <div className="flex-1">
          <div className="flex justify-end text-[28px] px-4">
            { isLiked ? <AiFillHeart className="text-[#01ff01] cursor-pointer" onClick={toggleLike} /> : <AiOutlineHeart className="cursor-pointer text-[#777]" onClick={toggleLike} /> }
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button className="border-[1px] m-2 bg-white p-[1px] px-2 flex items-center justify-center cursor-pointer rounded-[50%] w-10 h-10" onClick={backThirty}><GrRotateLeft /></button>
          <button className="border-[1px] m-2 bg-white p-[1px] px-2 cursor-pointer rounded-[50%] w-14 h-14 flex items-center justify-center" onClick={toggePlayPause}>
            {isPlaying ? <BsPauseFill className="text-[22px]" /> : <BsPlayFill className="text-[22px]" />}
          </button>
          <button className="border-[1px] m-2 bg-white p-[1px] px-2 flex items-center justify-center cursor-pointer rounded-[50%] w-10 h-10" onClick={frontThirty}><GrRotateRight /></button>
        </div>

        <div className="flex-1 flex justify-end items-center p-2">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => {props.setLoop(prev => !prev)}}
          >
            <RxLoop
              className="text-[25px] text-[#bbb]"
              style={props.loop ? {color: "green"} : {color: "#bbb"}}
            />
          </div>
          {volume.x === 0 ?
            <BsFillVolumeMuteFill
              className="text-[#bbb] text-[25px] m-[6px] cursor-pointer"
              onClick={handleMute}
            />
            :
            <BsVolumeUpFill
              className="text-[#bbb] text-[25px] m-[6px] cursor-pointer"
              onClick={handleMute}
            />
          }
          <Slider
            axis="x"
            x={volume.x}
            onChange={({ x }) => {
              setVolume(state => ({...state, x}))
              audioPlayer.current.volume = x/100
            }}
            styles={{
              active: {
                backgroundColor: "#569160"
              },
              track: {
                width: "80px",
                height: "4px",
              },
              thumb: {
                width: "12px",
                height: "12px"
              }
            }}
          />
        </div>
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
              height: "5px",
              backgroundColor: "#555"
            },
            thumb: {
              width: "12px",
              height: "12px"
            }
          }}
        />
        </div>
        <div className="text-white ">&nbsp;&nbsp;{isNaN(duration) ? "00:00" : calculateTime(duration)}</div>
      </div>



    </div>
  )
}
