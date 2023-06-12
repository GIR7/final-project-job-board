import React from 'react';
import { UnauthenticatedTemplate } from '@azure/msal-react';
import '../../tailwind.css';
export const Home = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-300">
			<div className="flex flex-col items-center bg-white p-20 rounded-lg mt-2 shadow-md w-full max-w-screen-lg my-[7rem]">
				<UnauthenticatedTemplate>
					<div className="text-center">
						<div className="bg-blue-200 rounded-lg p-2 mb-6">
							<h1 className="text-5xl font-bold text-black-800">
							Welcome to the International Student CS Job Board!
						</h1>
						</div>
						<p className="text-4xl text-gray-700 mb-6">
							We offer job resources specifically tailored for international students studying in the United States.
						</p>
						<p className="text-black-600 text-4xl font-bold text-blue-800">
							Please sign in to get started on your job search journey.
						</p>
					</div>
				</UnauthenticatedTemplate>
			</div>
		</div>
	);
};
