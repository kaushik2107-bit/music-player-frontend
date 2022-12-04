import { GoogleLogin } from "react-google-login"
import { useState, useEffect } from "react"
import axios from "axios"

const clientId = "814240228633-17qg9i62sljgr64e30jbr585fug81rpj.apps.googleusercontent.com"

export default function Login({ setUserName }) {
	const registerLogin = async (userData) => {
		const url = "https://musicplayer-production-5463.up.railway.app/register"
		const block = {
			email: userData.email,
			name: userData.name,
			profilePic: userData.imageUrl
		}
		const result = await axios.post(url, block)
		localStorage.setItem('muzic', JSON.stringify(block))
	}

	const onSuccess = (res) => {
		// console.log("Login Success! Current user: ", res.profileObj);
		setUserName(res.profileObj)
		registerLogin(res.profileObj)
	}

	const onFailure = (res) => {
		console.log("Login Failed! res: ", res)
	}

	return (
		<div id = "signInButton">
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'signle_host_origin'}
				isSignedIn={true}
			/>
		</div>
	)
}
