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
					<h1 className="text-3xl font-bold mb-4">{job.title}</h1>
					<div className="flex items-center bg-gray-200 rounded-lg p-2 mb-4">
						<p className="mr-4 text-lg">
							<span className="font-semibold">Type:</span> {job.type}
						</p>
						<p className="text-lg">
							<span className="font-semibold">Status:</span> {job.status}
						</p>
					</div>
					<div className="bg-gray-100 rounded-lg p-4 mb-4">
						<h2 className="text-lg font-semibold mb-2">Description:</h2>
						<p className="text-gray-700">{job.description}</p>
					</div>
					<button
						className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
						onClick={goBack}
					>
						Go Back
					</button>
				</div>
			) : (
				<p>Loading job details...</p>
			)}
		</div>
	);
};

export default JobDetail;
