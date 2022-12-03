import axios from "axios"
import { useState, useEffect, useRef } from "react"
import AudioPlayer from "./components/audioPlayer/index"
import { BsPlayFill } from "react-icons/bs"
import logo from "./assets/logo.png"
import Navbar from "./components/navbar/index"

function Home() {
  const [latestSongs, setLatestSongs] = useState({
    image: [],
    track: [],
    fileName: []
  })

  const fetchLatestSongs = async () => {
    const url = "https://music-player-c3g1.onrender.com/latest"
    const result = await axios.get(url)
    setLatestSongs(prev => ({...prev, image: result.data.image_id, track: result.data.track_id, fileName: result.data.file_name}))
  }

  useEffect(() => {fetchLatestSongs()}, [])

  const [focus, setFocus] = useState(false)

  const [search, setSearch] = useState("")

  const [image, setImage] = useState([])
  const [track, setTrack] = useState([])
  const [fileName, setFileName] = useState([])

  const [isLoop, setIsLoop] = useState(true)

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
    } else {
      setImage([])
      setTrack([])
      setFileName([])
    }
  }, [search])

  return (
    <div className="bg-[#333] w-[100vw] h-[calc(100vh-150px)] flex "  >
      <div className="w-[250px] bg-[#111] h-[100%]">
        <div className="w-[50%] m-auto h-[100px] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${logo})`}} />
        <Navbar />
      </div>
      <div className="w-[calc(100vw-250px)] overflow-scroll">
        <div className="m-2">
          <input
            placeholder={"Let's find your song"}
            onFocus={()=> setFocus(true)}
            type="text"
            value={search}
            onChange={handleChange}
            className="w-96 h-8 rounded-2xl m-2 p-2 placeholder:text-[12px] p-4 bg-[#777] placeholder:text-[#ddd] text-[#eee] outline-none"
          />
          <div onFocus={() => setFocus(true)} style={focus ? { boxShadow: "0 20px 40px 10px #222" } : {display: "none"}} className="fixed z-10 w-fit max-h-[345px] overflow-scroll rounded-xl bg-[#222] border-y-8 border-[#222]">
            {image.length ? <div className="w-96 px-2 mx-2 flex text-[#777] text-[12px] mt-2">
              <p className="flex-1">{image.length} results</p>
              <p className="cursor-pointer hover:text-white" onClick={() => setFocus(false)}>Hide</p>
            </div> : <></>}
            {image.map((item, index) => {
              return (
                <div key={index} className="w-96 h-[70px] bg-[#333] m-2 rounded-xl p-[5px] flex">
                  <div className="w-[60px] h-[60px] rounded-md" style={{backgroundImage: `url(${item})`, backgroundSize: "cover", backgroundPosition: "center"}} />
                  <div className="flex-1 flex justify-start items-center p-2 text-[#cdd] min-w-0 flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                    {fileName[index]}
                  </div>
                  <div className="cursor-pointer flex justify-center items-center text-[40px] text-[#fa5056]" onClick={() => fetchTrack(item, track[index], fileName[index])}><BsPlayFill /></div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="m-2 p-2 text-[18px] font-normal text-[#ddd]">
          Recently Added
        </div>



        <div className="m-2 p-2 flex overflow-hidden flex-wrap gap-4 h-[240px]">
          {
            latestSongs.image.map((item, index) => {
              return (
                <div className="w-[220px] h-[220px] bg-cover bg-center" style={{backgroundImage: `url(${item})`}} key={index}>
                  <div className="relative bg-gradient-to-b from-transparent to-black w-[220px] h-[220px] flex items-end">
                    <div className="flex justify-between items-center w-[100%] mb-[10px] px-2 gap-4">
                      <p className="w-[150px] text-white text-[12px] bottom-[10px] left-[10px] truncate ">{latestSongs.fileName[index]}</p>
                      <button className="text-white bg-green-700 rounded-[50%] flex justify-center items-center w-[30px] h-[30px]" onClick={() => fetchTrack(item, latestSongs.track[index], latestSongs.fileName[index])}><BsPlayFill /></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>


      </div>

      <div className="absolute bottom-0 w-[100vw] h-[150px] flex justify-around pr-8 items-center bg-[#222]">
        <div className="w-[15%] max-w-[140px] h-[140px]  bg-cover bg-center m-2 left-0 bottom-0" style={{backgroundImage: `url(${audioData.image})`}} />
        <AudioPlayer
          link={audioData.track}
          autoPlay={play}
          loop={isLoop}
          setLoop={setIsLoop}
        />
      </div>
    </div>
  )
}

export default Home
