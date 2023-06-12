import {UserContext} from "@/Services/UserIdContext.tsx";
import {useMsal} from "@azure/msal-react";
import axios from "axios";
import React, {useContext} from "react";

export const SignInButton = () => {
	
	const { instance, accounts } = useMsal();
	const { updateUserId } = useContext(UserContext);
	
	const handleSignIn = async () => {
		try {
			 await instance.loginPopup({
				scopes: ["user.read"],
			});
			
			// Get the user's account
			// Get the user's details using Microsoft Graph API
			// Send the user's details to the backend
			await getUserandCreate();
			
		} catch (error) {
			console.log("Sign-in error: ", error);
		}
	};
	
	const getUserandCreate = async () => {
		try {
			// Call Microsoft Graph API to get the user's details
			const userDetails = await instance.getActiveAccount()
			const username =  userDetails.name
			const useremail = userDetails.username
			
			// Send the user's details to the backend
			const response = await axios.post('http://[::1]:8080/users', { name:username,email:useremail});
			updateUserId(response.data.id)
		}catch (error) {
			console.log("Error getting user details: ", error);
		}
	}
	
	return (
		<>
			<button
				className="block mx-auto px-4 py-2 bg-blue-500 hover:bg-green-500 text-white font-semibold rounded-md"
				onClick={handleSignIn}
			>Sign in</button>
		</>
	);
};
