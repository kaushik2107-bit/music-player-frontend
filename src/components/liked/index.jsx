import axios from "axios"
import { useState, useEffect } from "react"
import { BsPlayFill } from "react-icons/bs"

export default function Liked({ setAudioData, setPlay }) {
  const [likedSongs, setLikedSongs] = useState([])

  const fetchLiked = async() => {
    const email = JSON.parse(localStorage.getItem("muzic")).email
    const result = await axios.post("https://musicplayer-production-5463.up.railway.app/fetchlike", {email: email})
    setLikedSongs(result.data.data)
  }

  useEffect(() => {
    fetchLiked()
  }, [])

  const handleClick = (image, track, name) => {
    setAudioData(prev => ({...prev, image: image, track: track, file: name}))
    setPlay(true)
  }

  return (
    <>
      <div className="h-[100px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[35px] font-extrabold flex justify-between items-center px-4">
        Liked Songs
      </div>
      <div className="p-2 flex flex-col gap-2 mt-4">
        {
          likedSongs.map((item, index) => {
            return (
              <div className="flex bg-[#222] rounded-lg p-2 items-center gap-4 justify-around px-2">
                <img src={item.image} className="rounded-md w-[50px] h-[50px]" />
                <p className="flex-1 text-white">{item.fileName}</p>
                <button className="text-green-600 text-[35px]" onClick={() => handleClick(item.image, item.track, item.fileName)}><BsPlayFill /></button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
