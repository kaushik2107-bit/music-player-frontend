import axios from "axios"
import { useState, useEffect } from "react"
import AudioPlayer from "./components/audioPlayer/index"
import { BsPlayFill } from "react-icons/bs"

function App() {
  const [search, setSearch] = useState("")

  const [image, setImage] = useState([])
  const [track, setTrack] = useState([])
  const [fileName, setFileName] = useState([])


  const [audioData, setAudioData] = useState({
    image: "",
    track: "",
    file: ""
  })
  const [play, setPlay] = useState(false)


  async function fetchData() {
    try {
      const url = "https://music-player-c3g1.onrender.com/api/" + search
      const result = await axios.get(url)
      setImage(result.data.image_id)
      setTrack(result.data.track_id)
      setFileName(result.data.file_name)

    } catch (err) {

    }
  }

  const fetchTrack = (image, track, name) => {
    setAudioData(prev => ({...prev, image: image, track: track, file: name}))
    setPlay(true)
  }




  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search != "") {
      fetchData()
    }
  }, [search])

  return (
    <div className="bg-[#333] w-[100vw] h-[100vh]">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="w-96 h-8 rounded-xl m-2 p-2"
      />



      {image.map((item, index) => {
        return (
          <div key={index} className="w-96 h-[70px] bg-white m-2 rounded-xl p-[5px] flex">
            <div className="w-[60px] h-[60px] rounded-md" style={{backgroundImage: `url(${item})`, backgroundSize: "cover", backgroundPosition: "center"}} />
            <div className="flex-1 flex justify-start items-center p-2 text-[#222] min-w-0 flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {fileName[index]}
            </div>
            <div className="cursor-pointer flex justify-center items-center text-[40px] text-[#fa5056]" onClick={() => fetchTrack(item, track[index], fileName[index])}><BsPlayFill /></div>
          </div>
        )
      })}

      <div className="absolute bottom-0 w-[100vw] h-[150px] flex justify-around pr-8 items-center bg-[#222]">
        <div className="border-2 w-[15%] max-w-[140px] h-[140px]  bg-cover bg-center m-2 left-0 bottom-0" style={{backgroundImage: `url(${audioData.image})`}} />
        <AudioPlayer link={audioData.track} autoPlay={play} />
      </div>
    </div>
  )
}

export default App
