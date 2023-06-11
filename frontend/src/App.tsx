import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/Joblist.tsx';
import JobDetail from './components/Jobdetail.tsx';
import SavedJobs from './components/Savedjobs.tsx';
import { FilterProvider } from './Services/FilterContext.tsx'
import {MsalProvider} from "@azure/msal-react";
import NavBar from './components/NavBar.tsx'

const App = ({msalinstance}) => {
	return (
		<Router>
			<MsalProvider instance={msalinstance}>
				<NavBar/>
			<FilterProvider>
			<Routes>
				
				
				<Route  path="/" element={<JobList />} />
				<Route path="/savedjobs" element={<SavedJobs />} />
			
				<Route path="/jobs/:jobId" element={<JobDetail />} />
			</Routes>
		</FilterProvider>
</MsalProvider>
		</Router>
	);
};

export default App;
