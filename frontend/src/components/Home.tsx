import React from 'react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

export const Home = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-md">
			<UnauthenticatedTemplate>
				<h1 className="text-3xl font-bold mb-4">
					Welcome to International Student CS Job Board!
				</h1>
				<h2 className="text-lg mb-4">
					We offer job resources for international students in the United States.
				</h2>
				<h3>Please sign in to start</h3>
			</UnauthenticatedTemplate>
		</div>
	);
};
