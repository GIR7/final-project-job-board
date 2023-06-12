import React, { createContext, useState } from 'react';

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
	const [typeFilter, setTypeFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	
	const updateType = (type) => {
		setTypeFilter(type);
		
	};
	const updateStaus= ( status) => {
		setStatusFilter(status);
	}
	return (
		<FilterContext.Provider value={{ typeFilter, statusFilter,updateType, updateStaus  }}>
			{children}
		</FilterContext.Provider>
	);
};
