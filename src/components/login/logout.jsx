import { GoogleLogout } from "react-google-login"

const clientId = "814240228633-17qg9i62sljgr64e30jbr585fug81rpj.apps.googleusercontent.com"

export default function Logout({ setUserName }) {

	const onSuccess = () => {
		console.log("Log out successfully");
		// setUserName()
		localStorage.removeItem("muzic")
		window.location = "/login"
	}

	return (
		<div id="signOutButton" className="cursor-pointer">
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
				render={renderProps => (
						<button onClick={renderProps.onClick} className="text-red-600 text-[14px] cursor-pointer" >Logout</button>
				)}
			/>
		</div>
	)
}
