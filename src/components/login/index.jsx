import { gapi } from "gapi-script"
import { useState, useEffect } from "react"
import LoginButton from "./login"
import LogoutButton from "./logout"

const clientId = "814240228633-17qg9i62sljgr64e30jbr585fug81rpj.apps.googleusercontent.com"

export default function Login({ setStatus }) {
  const [userName, setUserName] = useState()
  useEffect(() => {
    const start = () => {
      const auth2 = gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })

      setStatus(auth2.isSignedIn.le)
    }

    gapi.load('client:auth2', start)
  })

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="m-2 absolute top-8 text-[16px] max-w-[500px] text-center font-extrabold bg-green-500 p-2 rounded-xl text-[#eee]">
        Sorry, we do not support any other ways to sign in just yet!
      </div>
      {userName ?
        <LogoutButton
          setUserName={setUserName}
        />
        :
        <LoginButton
          setUserName={setUserName}
        />
      }
    </div>
  )
}

// {
//   email: email,
//   name: name,
//   profilePic: image,
//   likedSongs: [
//     {
//       fileName: fileName,
//       image: image,
//       track: track
//     }
//   ],
//   playlists: [
//     {
//       name: name,
//       cover: cover,
//       songs: [
//         {
//           fileName: fileName,
//           image: image,
//           track: track
//         }
//       ]
//     }
//   ]
// }
