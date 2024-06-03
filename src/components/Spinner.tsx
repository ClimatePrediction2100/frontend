export const Spinner = () => {
	return (
		<div className="flex flex-col w-full p-3 pl-5 bg-white shadow-lg web:w-3/4 rounded-2xl h-full">
			<p className="text-2xl">Graph</p>
			<div className="flex items-center justify-center h-full">
				<div className="spinner animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
			</div>
		</div>
	);
};
