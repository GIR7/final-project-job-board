import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/Joblist.tsx';
import JobDetail from './components/Jobdetail.tsx';
import SavedJobs from './components/Savedjobs.tsx';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route  path="/" element={<JobList />} />
				<Route path="/jobs/:jobId" element={<JobDetail />} />
				<Route path="/savedjobs" element={<SavedJobs />} />
			</Routes>
		</Router>
	);
};

export default App;
