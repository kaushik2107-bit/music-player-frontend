import { useState, useEffect } from "react"
import axios from "axios"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { RxCrossCircled } from "react-icons/rx"

export default function NewPlaylist() {

  const [playlistArray, setPlaylistArray] = useState([])
  const [playlistTitle, setPlaylistTitle] = useState("#" + Math.floor(Math.random() * 100000000))

  const [search, setSearch] = useState("")


  const [image, setImage] = useState([])
  const [track, setTrack] = useState([])
  const [fileName, setFileName] = useState([])
  async function fetchData() {
    try {
      const url = "https://musicplayer-production-5463.up.railway.app/api/" + search
      const result = await axios.get(url)
      setImage(result.data.image_id)
      setTrack(result.data.track_id)
      setFileName(result.data.file_name)

    } catch (err) {
      console.log(err)
    }
  }

  const addItem = (image, track, file) => {
    setPlaylistArray(prev => [...prev, {image: image, track: track, file: file}])
  }

  const removeItem = (image, track, file) => {
    setPlaylistArray(prev => prev.filter(item => item.image !== image && item.track !== track && item.file !== file))
  }

  const checkIfExist = (image, track, file) => {
    for (let item of playlistArray) {
      if (item.image === image && item.track === track && item.file === file) return true
    }
    return false
  }


  const handleSubmit = async () => {
    const data = {
      email: JSON.parse(localStorage.getItem("muzic")).email,
      name: playlistTitle,
      cover: playlistArray[0].image,
      songs: playlistArray
    }

    const result = await axios.post("https://musicplayer-production-5463.up.railway.app/addplaylist", data)
    if (result.status === 202) {
      alert(result.data.message)
    }
  }

  useEffect(() => {
    if (search != "") {
      fetchData()
    } else {
      setImage([])
      setTrack([])
      setFileName([])
    }
  }, [search])

  return (
    <>
      <div className="p-2 px-4 flex items-center gap-4">
        <div className="bg-[#777] w-[150px] h-[150px] bg-center bg-cover" style={playlistArray.length ? {backgroundImage: `url(${playlistArray[0].image})`} : {}} />
        <input
          className="bg-[transparent] border-b-[2px] border-[#222] outline-none p-2 text-[#999] text-[25px] font-black"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(prev => e.target.value)}
        />
        <button className="px-4 bg-green-600 text-white p-[2px] text-[17px] rounded-3xl font-normal" onClick={handleSubmit} >
          Save
        </button>
      </div>

      <div className="p-2 px-4" >
        <input
          className="bg-[#444] w-[300px] h-[40px] p-2 px-4 text-[#ccc] outline-none"
          placeholder="Let's find some song"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <div className="flex gap-2 flex-col pt-2">
          {image.map((item, index) => {
            return (
              <div key={index} className="w-full h-[70px] bg-[#333] hover:bg-[#444] rounded-xl p-[5px] flex">
                <div className="w-[60px] h-[60px] rounded-md" style={{backgroundImage: `url(${item})`, backgroundSize: "cover", backgroundPosition: "center"}} />
                <div className="flex-1 flex justify-start items-center p-2 text-[#cdd] min-w-0 flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                  {fileName[index]}
                </div>
                {
                    checkIfExist(item, track[index], fileName[index])
                    ?
                    <div className="cursor-pointer flex justify-center items-center text-[30px] text-red-500 px-2" onClick={() => removeItem(item, track[index], fileName[index])}><RxCrossCircled /></div>
                    :
                    <div className="cursor-pointer flex justify-center items-center text-[30px] text-[#888] px-2" onClick={() => addItem(item, track[index], fileName[index])}><MdOutlineAddCircleOutline /></div>
                }
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-2 px-4">
        { playlistArray.length ? <p className="text-[#ccc] font-bold text-[24px] py-2">Your Playlist</p> : <></> }
        {
          playlistArray.map((item, index) => {
            return (
              <div key={index} className="w-full h-[70px] bg-[#333] hover:bg-[#444] rounded-xl p-[5px] flex">
                <div className="w-[60px] h-[60px] rounded-md" style={{backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center"}} />
                <div className="flex-1 flex justify-start items-center p-2 text-[#cdd] min-w-0 flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.file}
                </div>
                <div className="cursor-pointer flex justify-center items-center text-[30px] text-red-500 px-2" onClick={() => removeItem(item.image, item.track, item.file)}><RxCrossCircled /></div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
