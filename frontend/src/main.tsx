import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";


import {PublicClientApplication} from "@azure/msal-browser";
export const pca = new PublicClientApplication({
	auth:{
		clientId:"be5290d4-76f1-4351-9491-2c42296c2f07",
		// authority:"",
		redirectUri:"http://localhost:5173/"
	}
})



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App msalinstance = {pca}/>
	</React.StrictMode>
);

