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
				지역: {data.selectedArea}, 위도: {data.latitude}, 경도: {data.longitude}
				, CO2 농도: {data.co2}
			</span>
			<button onClick={onDelete} className="delete-button">
				삭제
			</button>
		</div>
	);
};

export default SimulationItem;
