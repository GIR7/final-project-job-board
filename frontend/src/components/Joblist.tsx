import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import search from './Search.tsx';
import { useNavigate, Link } from 'react-router-dom';
import { FilterContext } from '../Services/FilterContext.tsx'
import { UserContext } from '../Services/UserIdContext.tsx';

const JobList = () => {
	const [jobs, setJobs] = useState([]);
	const {typeFilter, statusFilter, updateType, updateStaus} = useContext(FilterContext);
	const {userId} = useContext(UserContext);
	
	//fetches joblist when first time rendered
	// filters the job list automatically when the dropdown values change
	//without hit filter button
	useEffect(() => {
		// Filter jobs when dropdown values change
		filterJobs();
	}, [typeFilter, statusFilter]);
	
	const filterJobs = async () => {
		try {
			const response = await search('http://[::1]:8080/filterjobs', {
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
			await axios.post('http://[::1]:8080/saved', {user_id: userId, job_id: jobId});
		} catch (error) {
			console.error('Error saving job:', error);
		}
	};
	
	const navigate = useNavigate();
	const goToSavedJobs = () => {
		navigate('/savedjobs'); // Redirect the user to the Savedjobs page using navigate
	};
	
	const viewJobDetail = (jobId) => {
		navigate(`/jobs/${jobId}`); // Redirect the user to the JobDetail page with the job ID
	};
	
	const clearFilters = () => {
		updateType("");
		updateStaus("");
		filterJobs();
	};
	
	return (
		<div>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold mb-4">Job List</h1>
				<button
					className="mb-5 mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-lg"
					onClick={goToSavedJobs}
				>
					My Jobs
				</button>
			</div>
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center">
					<label htmlFor="typeFilter" className="mr-2 text-gray-700 text-lg">
						Type:
					</label>
					<select
						id="typeFilter"
						value={typeFilter}
						onChange={(e) => updateType(e.target.value)}
						className="px-3 py-2 border border-gray-300 rounded-md text-lg"
					>
						<option value="">All</option>
						<option value="Remote">Remote</option>
						<option value="Onsite">Onsite</option>
						<option value="Hybrid">Hybrid</option>
					</select>
				</div>
				<div className="flex items-center">
					<label htmlFor="statusFilter" className="mr-2 text-gray-700 text-lg">
						Status:
					</label>
					<select
						id="statusFilter"
						value={statusFilter}
						onChange={(e) => updateStaus(e.target.value)}
						className="px-3 py-2 border border-gray-300 rounded-md text-lg"
					>
						<option value="">All</option>
						<option value="CPT">CPT</option>
						<option value="OPT">OPT</option>
						<option value="Sponsor H1B visa">Sponsor H1B visa</option>
					</select>
				</div>
				<button
					className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md text-sm"
					onClick={clearFilters}
				>
					Clear Filters
				</button>
			</div>
			<ul>
				{jobs?.map((job) => (
					<li key={job.id} className="bg-gray-100 rounded-lg p-2 mb-4">
						<h2 className="text-xl font-bold mb-2">{job.title}</h2>
						<p className="text-gray-700 mb-2">{job.description}</p>
						<button
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md mr-2"
							onClick={() => saveJob(job.id)}
						>
							Save
						</button>
						<button
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
							onClick={() => viewJobDetail(job.id)}
						>
							View Job Detail
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
export default JobList;
