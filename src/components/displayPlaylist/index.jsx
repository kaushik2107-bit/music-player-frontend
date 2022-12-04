import { BsPlayFill } from "react-icons/bs"

export default function DisplayPlaylist({ playData, setAudioData, setPlay }) {
  const handleClick = (image, track, name) => {
    setAudioData(prev => ({...prev, image: image, track: track, file: name}))
    setPlay(true)
  }
  console.log(playData)
  return (
    <>
      <div className="p-2 px-4 flex items-center gap-4">
        <div className="bg-[#777] w-[150px] h-[150px] bg-center bg-cover" style={{backgroundImage: `url(${playData.cover})`}} />
        <input
          className="bg-[transparent] border-b-[2px] border-[#222] border-none outline-none p-2 text-[#999] text-[25px] font-black"
          value={playData.name}
          onChange={(e) => setPlaylistTitle(prev => e.target.value)}
          disabled
        />
      </div>

      <div className="p-2 px-4">
        { playData.songs.length ? <p className="text-[#ccc] font-bold text-[24px] py-2">Your Songs</p> : <></> }
        {
          playData.songs.map((item, index) => {
            return (
              <div key={index} className="w-full h-[70px] bg-[#333] hover:bg-[#444] rounded-xl p-[5px] flex">
                <div className="w-[60px] h-[60px] rounded-md" style={{backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center"}} />
                <div className="flex-1 flex justify-start items-center p-2 text-[#cdd] min-w-0 flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.file}
                </div>
                <button className="text-green-600 text-[35px]" onClick={() => handleClick(item.image, item.track, item.file)}><BsPlayFill /></button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
