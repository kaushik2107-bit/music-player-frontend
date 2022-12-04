import { HiHome } from "react-icons/hi"
import { AiFillHeart } from "react-icons/ai"
import { MdAddBox } from "react-icons/md"
import { useState } from "react"
import LogoutButton from "../login/logout"

export default function Navbar() {
  const [state, setState] = useState(1)
  return (
    <div className="text-[#eee]">
      <ul className="text-[20px] text-[#999]">
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 1 ? {color: "#fff"} : {}} onClick={() => setState(1)}><HiHome className="text-[25px]" /> &nbsp; Home</li>
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 2 ? {color: "#fff"} : {}} onClick={() => setState(2)}><AiFillHeart className="text-[25px]" /> &nbsp; Liked Songs</li>
        <li className="p-2 px-4 flex items-center cursor-pointer text-[18px]" style={state === 3 ? {color: "#fff"} : {}} onClick={() => setState(3)}><MdAddBox className="text-[30px] text-[#49f47e]" /> &nbsp; Create Playlist</li>
      </ul>
      <div className="border-t-[1px] border-[#777] my-2 m-auto w-[90%]" />
      <p className="px-4 text-[15px] text-[#555]">Your Playlists</p>
      <LogoutButton />
    </div>
  )
}
