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
			<div className="flex items-center justify-between">
				<div className="mr-2 text-white">Welcome, {name}</div>
			<button
				className="block mx-auto px-4 py-2 bg-black-500 hover:bg-red-600 text-black font-semibold rounded-md"
				onClick={handleSignOut}
			>
				Sign out
			</button>
			</div>
		</>
	);
};
