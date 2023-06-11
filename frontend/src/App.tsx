import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/Joblist.tsx';
import JobDetail from './components/Jobdetail.tsx';
import SavedJobs from './components/Savedjobs.tsx';
import { FilterProvider } from './Services/FilterContext.tsx'


const App = () => {
	return (
		<Router>
			<FilterProvider>
			<Routes>
				<Route  path="/" element={<JobList />} />
				<Route path="/jobs/:jobId" element={<JobDetail />} />
				<Route path="/savedjobs" element={<SavedJobs />} />
			</Routes>
		</FilterProvider>
		</Router>
	);
};

export default App;
