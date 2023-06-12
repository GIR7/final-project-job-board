import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {useIsAuthenticated} from "@azure/msal-react";
import { UserContext } from '../Services/UserIdContext.tsx'
const NavBar = () => {
	const isAuth = useIsAuthenticated();
	return (
		<div >
			{isAuth ? <SignOutButton /> : <SignInButton />}
		</div>
	);
};

const SignInButton = () => {
	
	const { instance, accounts } = useMsal();
	const { updateUserId } = useContext(UserContext);
	
	const handleSignIn = async () => {
		try {
			const response = await instance.loginPopup({
				scopes: ["user.read"],
			});
			
			// Get the user's account
			// Get the user's details using Microsoft Graph API
			// Send the user's details to the backend
			const userDetails = await getUserandCreate();

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
		
			console.log("response from send user to backend ID",response.data.id)
			updateUserId(response.data.id)
			// return response.data.id;
		}catch (error) {
			console.log("Error getting user details: ", error);
		}
	}
	
	return (
		<>
			<button onClick={handleSignIn}>Sign in</button>
		</>
	);
};


const SignOutButton = () => {
	const {instance} = useMsal();
	const handleSignOut=()=>{
		instance.logoutRedirect();
		}
	const [name, setName] =  useState('');
	useEffect(() => {
		const currAccount = instance.getActiveAccount();
		if(currAccount) {
			setName(currAccount.name)
		}
	}, [instance]);
	
	return (
		<>
			<div>Welcome, {name}</div>
		<button onClick={handleSignOut} color="inherit">Sign out</button>
		</>
	)
};

export default NavBar;
