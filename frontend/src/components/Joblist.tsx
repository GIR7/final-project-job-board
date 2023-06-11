import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import search from './Search.tsx';
import { useNavigate, Link } from 'react-router-dom';
import JobDetail from './Jobdetail.tsx';
import { FilterContext } from '../Services/FilterContext.tsx'

const JobList = () => {
	const [jobs, setJobs] = useState([]);
	// const [typeFilter, setTypeFilter] = useState('');
	// const [statusFilter, setStatusFilter] = useState('');
	const { typeFilter, statusFilter, updateType, updateStaus } = useContext(FilterContext);
	
	//fetches joblist when first time rendered
	// filters the job list automatically when the dropdown values change
	//without hit filter button
	useEffect(() => {
		// Filter jobs when dropdown values change
		filterJobs();
	}, [typeFilter, statusFilter]);
	
	// const fetchJobs = async () => {
	// 	try {
	// 		const response = await axios.get('http://[::1]:8080/alljobs');
	// 		setJobs(response.data);
	// 	} catch (error) {
	// 		console.error('Error fetching jobs:', error);
	// 	}
	// };
	
	const filterJobs = async () => {
		try {
			const response =  await search('http://[::1]:8080/filterjobs', {
				type: typeFilter,
				status: statusFilter,
			});
			console.log(response);
			setJobs(response);
		} catch (error) {
			console.error('Error filtering jobs:', error);
		}
	};
	
	const saveJob = async (jobId) => {
		try {
			await axios.post('http://[::1]:8080/saved', { user_id: 2, job_id: jobId });
		} catch (error) {
			console.error('Error saving job:', error);
		}
	};
	
	const navigate = useNavigate();
	const goToSavedJobs = () => {
		navigate('/savedjobs'); // Redirect the user to the Savedjobs page using navigate
	};
	
	const viewJobDetail = (jobId) => {
		navigate(`/jobdetail/${jobId}`); // Redirect the user to the JobDetail page with the job ID
	};
	
	
	const clearFilters = () => {
		// setTypeFilter('');
		// setStatusFilter('');
		updateType("");
		updateStaus("");
		filterJobs();
	};
	
	
	return (
		<div>
			<h1>Job List</h1>
			<button onClick={goToSavedJobs}>My Jobs</button>
			<div>
				<label htmlFor="typeFilter">Type:</label>
				<select
					id="typeFilter"
					value={typeFilter}
					onChange={(e) => updateType(e.target.value)}
				>
					<option value="">All</option>
					<option value="Remote">Remote</option>
					<option value="Onsite">Onsite</option>
					<option value="Hybrid">Hybrid</option>
				</select>
			</div>
			<div>
				<label htmlFor="statusFilter">Status:</label>
				<select
					id="statusFilter"
					value={statusFilter}
					onChange={(e) => updateStaus(e.target.value)}
				>
					<option value="">All</option>
					<option value="CPT">CPT</option>
					<option value="OPT">OPT</option>
					<option value="Sponsor H1B visa">Sponsor H1B visa</option>
				</select>
			</div>
			
			<button onClick={clearFilters}>Clear Filters</button>
			<ul>
				{jobs?.map((job) => (
					<li key={job.id}>
						<h2>{job.title}</h2>
						<p>{job.description}</p>
						<button onClick={() => saveJob(job.id)}>Save</button>
						<Link to={`/jobs/${job.id}`}>View Details</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default JobList;
