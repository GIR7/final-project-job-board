import {Home} from "@/components/Home.tsx";
import React from 'react';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import JobList from './components/Joblist.tsx';
import JobDetail from './components/Jobdetail.tsx';
import SavedJobs from './components/Savedjobs.tsx';
import { FilterProvider } from './Services/FilterContext.tsx'
import { UserProvider } from './Services/UserIdContext.tsx'
import {MsalProvider,useIsAuthenticated } from "@azure/msal-react";
import NavBar from './components/NavBar.tsx'


const JobRoute = ()=>{
	const isAuth  = useIsAuthenticated();
	return (
		<Routes>
			{isAuth ? <Route path='/' element={<JobList/>} />: <Route path='/' element={<Home />} />}
			{isAuth ? <Route path='/savedjobs' element={<SavedJobs />} /> :<Route path='/savedjobs'  element={<Home />} />}
			{isAuth ? <Route path='/jobs/:jobId' element={<JobDetail />} /> : <Route path='/jobs/:jobId' element={<Home />} />}
		</Routes>
	)
}

const App = ({msalinstance}) =>{
	return (
		<BrowserRouter>
			<MsalProvider instance={msalinstance}>
				<UserProvider>
				<FilterProvider>
						<NavBar/>
					<JobRoute/>
				</FilterProvider>
				</UserProvider>
			</MsalProvider>
		</BrowserRouter>
	);
};


export default App;
