import React from 'react';
import { UnauthenticatedTemplate } from '@azure/msal-react';

export const Home = () => {
	return (
		<>
			<UnauthenticatedTemplate>
				<div>Please sign-in to use this job site.</div>
			</UnauthenticatedTemplate>
			{/* Other content for the authenticated user */}
		</>
	);
};
