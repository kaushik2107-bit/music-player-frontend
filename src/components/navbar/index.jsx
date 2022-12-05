import { HiHome } from "react-icons/hi"
import { AiFillHeart } from "react-icons/ai"
import { MdAddBox } from "react-icons/md"
import { useState, useEffect } from "react"
import LogoutButton from "../login/logout"
import axios from "axios"

export default function Navbar({ setNavLink, setPlayData }) {
  const [state, setState] = useState(1)
  const [playlist, setPlaylist] = useState([])

  const fetchPlaylists = async() => {
    const res = await axios.post("https://musicplayer-production-5463.up.railway.app/fetchplaylist", {email: JSON.parse(localStorage.getItem("muzic"))?.email})
    setPlaylist(res.data.data)
  }

  useEffect(() => {
    fetchPlaylists()
  }, [])

  return (
    <div className="text-[#eee]">
      <ul className="text-[20px] text-[#999]">
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 1 ? {color: "#fff"} : {}} onClick={() => (setNavLink(prev => 1), setState(1))}><HiHome className="text-[25px]" /> &nbsp; Home</li>
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 2 ? {color: "#fff"} : {}} onClick={() => (setNavLink(prev => 2), setState(2))}><AiFillHeart className="text-[25px]" /> &nbsp; Liked Songs</li>
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 3 ? {color: "#fff"} : {}} onClick={() => (setNavLink(prev => 3), setState(3))}><MdAddBox className="text-[30px] text-[#49f47e]" /> &nbsp; Create Playlist</li>
      </ul>
      <div className="border-t-[1px] border-[#777] my-2 m-auto w-[90%]" />
      <p className="px-4 text-[17px] text-[#999]">Your Playlists</p>

      <div className="p-2 px-4 text-[#666] text-[14px] flex flex-col gap-2">
        {
          playlist.map((item, index) => {
            return (
              <div className="cursor-pointer" key={index} style={state === index+4 ? {color: "#fff"} : {}} onClick={() => (setNavLink(prev => 4), setState(index + 4), setPlayData(item))}>
                {item.name}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
