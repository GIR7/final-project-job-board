import React from "react";
import {useMsal} from "@azure/msal-react";

const NavBar = () => {
	return (
		<div >
			
					
					<SignInButton />
					<SignOutButton />
				
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
		<button onClick={handleSignin} >Sign in</button>
	)
};
const SignOutButton = () => {
	return (
		<button color="inherit">Sign out</button>
	)
};

export default NavBar;
