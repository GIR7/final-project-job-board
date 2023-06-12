import {useMsal} from "@azure/msal-react";
import React, {useEffect, useState} from "react";

export const SignOutButton = () => {
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
