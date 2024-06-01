// src/pages/Main.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import WorldMap from '../components/WorldMap';

const Main: React.FC = () => {
	return (
		<div className="relative flex flex-col h-screen overflow-hidden min-w-430pxr">
			<Header />
			<div className="flex flex-col pl-10 pr-10 overflow-y-auto bg-gray-200 grow">
				<div className="flex flex-col items-center w-full gap-3 mt-10">
					<div className="w-full wide:w-3/4">
						<WorldMap />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
