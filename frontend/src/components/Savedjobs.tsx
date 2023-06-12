import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import search from './Search.tsx';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../Services/UserIdContext.tsx';

const Savedjobs = () => {
	const [savedJobs, setSavedJobs] = useState([]);
	const { userId } = useContext(UserContext);
	
	useEffect(() => {
		// Fetch the saved jobs data from the backend
		const fetchSavedJobs = async () => {
			try {
				const response = await search('http://[::1]:8080/savedjobs', { userid: userId });
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
			await axios.post('http://[::1]:8080/saved', { user_id: userId, job_id: jobId });
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
			<button onClick={goToJoblist}>Job Board</button>
			<h1>Saved Jobs</h1>
			{savedJobs.length === 0 ? (
				<p>No saved jobs found.</p>
			) : (
				<ul>
					{savedJobs.map((job) => (
						<li key={job.id}>
							<h3>{job.title}</h3>
							<p>{job.description}</p>
							<button onClick={() => unsaveJob(job.id)}>Unsave</button>
							<Link to={`/jobs/${job.id}`}>View Details</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Savedjobs;

