import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {EventType, PublicClientApplication} from "@azure/msal-browser";

export const pca = new PublicClientApplication({
	auth:{
		clientId:"be5290d4-76f1-4351-9491-2c42296c2f07",
		// authority:"",
		redirectUri:"http://localhost:5173/"
	},
	cache:{
		cacheLocation:'localStorage',
		storeAuthStateInCookie:false
	}
})

// MSAL JS EVENT (GLOBAL)
pca.addEventCallback((event) => {
	if (event.eventType === EventType.LOGIN_SUCCESS) {
		console.log(event);
		// @ts-ignore
		pca.setActiveAccount(event.payload.account);
	}
});


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App msalinstance = {pca}/>
	</React.StrictMode>
);

