import React, {useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {useIsAuthenticated} from "@azure/msal-react";


const NavBar = () => {
	
	const isAuth = useIsAuthenticated();
	
	return (
		<div >
			{isAuth ? <SignOutButton /> : <SignInButton />}
		</div>
	);
};

const SignInButton = () => {
	const {instance} = useMsal();
	const handleSignin=()=>{
		instance.loginRedirect({
			scopes:['user.read']
		})
	}
	return (
		<>
			{/*<div>Click sign in </div>*/}
		<button onClick={handleSignin} >Sign in</button>
		</>
	)
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
			console.log(currAccount)
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
