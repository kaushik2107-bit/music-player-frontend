import { GoogleLogin } from "react-google-login"

const clientId = "814240228633-17qg9i62sljgr64e30jbr585fug81rpj.apps.googleusercontent.com"

export default function Login({ setUserName }) {

	const onSuccess = (res) => {
		console.log("Login Success! Current user: ", res.profileObj);
		setUserName(res.profileObj)
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
