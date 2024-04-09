const SimulationItem = ({
	data,
	onDelete,
}: {
	data: any;
	onDelete: () => void;
}) => {
	return (
		<div className="bg-white w-3/4 h-12 rounded-2xl shadow-lg p-2 pl-5 flex justify-between items-center">
			<span>
			{data.selectedArea === "" ? `위도: ${data.latitude}, 경도: ${data.longitude}` : `지역: ${data.selectedArea}`}
			</span>
			<div className="flex items-center">
				<span className="w-56">SSP: {data.selectedSsp}, 계절: {data.selectedSeason}</span>
				<div className="w-8"></div>
				<img onClick={onDelete} src="/delete.png" alt="삭제" className="h-8" />
			</div>
		</div>
	);
};

export default SimulationItem;
