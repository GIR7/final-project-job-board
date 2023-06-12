import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);
	
	const updateUserId = (id) => {
		setUserId(id);
	};
	
	return (
		<UserContext.Provider value={{ userId, updateUserId }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
