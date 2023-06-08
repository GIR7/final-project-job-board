import search from "@/components/Search.tsx";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobDetail = () => {
	const { jobId } = useParams();
	const [job, setJob] = useState(null);
	
	useEffect(() => {
		fetchJobDetails();
	}, []);
	
	
	//refactor using normal get method based on backend's refactor
	const fetchJobDetails = async () => {
		try {
			const response = await axios.get(`http://[::1]:8080/jobs/${jobId}`);
			setJob(response.data[0]);
		} catch (error) {
			console.error('Error fetching job details:', error);
		}
	};
	
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1); // Redirect the user to the Savedjobs page using navigate
	};
	
	return (
		<div>
			{job ? (
				<div>
					<h1>{job.title}</h1>
					<p>{job.description}</p>
					<button onClick={goBack}>Back</button>
					
				</div>
			) : (
				<p>Loading job details...</p>
			)}
		</div>
	);
};

export default JobDetail;
