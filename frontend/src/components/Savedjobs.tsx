import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import search from './Search.tsx';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../Services/UserIdContext.tsx';

const Savedjobs = () => {
	const [savedJobs, setSavedJobs] = useState([]);
	const {userId} = useContext(UserContext);
	
	useEffect(() => {
		// Fetch the saved jobs data from the backend
		const fetchSavedJobs = async () => {
			try {
				const response = await search('http://[::1]:8080/savedjobs', {userid: userId});
				setSavedJobs(response);
				
			} catch (error) {
				console.error('Error fetching saved jobs:', error);
			}
		};
		
		fetchSavedJobs();
	}, []);
	
	//to save/Unsave a job
	const unsaveJob = async (jobId) => {
		try {
			await axios.post('http://[::1]:8080/saved', {user_id: userId, job_id: jobId});
			setSavedJobs(savedJobs.filter(job => job.id !== jobId));
		} catch (error) {
			console.error('Error unsaving job:', error);
		}
	};
	
	const navigate = useNavigate();
	const goToJoblist = () => {
		navigate('/'); // Redirect the user to the joblist page using navigate
	};
	
	return (
		<div>
			<button
				className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md mb-4"
				onClick={goToJoblist}
			>
				Job Board
			</button>
			<h1 className="text-3xl font-bold mb-4">Saved Jobs</h1>
			{savedJobs.length === 0 ? (
				<p>No saved jobs found.</p>
			) : (
				<ul>
					{savedJobs.map((job) => (
						<li key={job.id} className="bg-gray-100 rounded-lg p-4 mb-4">
							<h2 className="text-xl font-bold mb-2">{job.title}</h2>
							<p className="text-gray-700 mb-2">{job.description}</p>
							<button
								className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-2"
								onClick={() => unsaveJob(job.id)}
							>
								Unsave
							</button>
							<Link
								to={`/jobs/${job.id}`}
								className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
							>
								View Details
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Savedjobs;

