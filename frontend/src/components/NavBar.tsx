import {SignInButton} from "@/components/SignInButton.tsx";
import {SignOutButton} from "@/components/SignOutButton.tsx";
import React from "react";
import {useIsAuthenticated} from "@azure/msal-react";


const NavBar = () => {
	const isAuth = useIsAuthenticated();
	return (
		<div >
			{isAuth ? <SignOutButton /> : <SignInButton />}
		</div>
	);
};


export default NavBar;
