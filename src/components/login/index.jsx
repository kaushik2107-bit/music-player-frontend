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
    <>
      {userName ?
        <LogoutButton
          setUserName={setUserName}
        />
        :
        <LoginButton
          setUserName={setUserName}
        />
      }
    </>
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
