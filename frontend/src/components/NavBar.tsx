import {SignInButton} from "@/components/SignInButton.tsx";
import {SignOutButton} from "@/components/SignOutButton.tsx";
import React from "react";
import {useIsAuthenticated} from "@azure/msal-react";


const NavBar = () => {
	const isAuth = useIsAuthenticated();
	return (
		<div className="flex items-center justify-between bg-gray-900 px-8 py-6">
			<div className="text-white text-2xl">International CS Student Job Board</div>
			{isAuth ? <SignOutButton /> : <SignInButton />}
		</div>
	);
};


export default NavBar;
