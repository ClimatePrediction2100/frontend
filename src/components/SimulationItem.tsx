const SimulationItem = ({
	data,
	onDelete,
}: {
	data: any;
	onDelete: () => void;
}) => {
	return (
		<div className="flex flex-col items-start justify-between w-full p-2 pl-5 bg-white shadow-lg web:w-3/4 web:items-center tablet:flex-row tablet:flex rounded-2xl">
			<span>
				{data.selectedArea === ""
					? `위도: ${data.latitude}, 경도: ${data.longitude}`
					: `지역: ${data.selectedArea}`}
			</span>
			<div className="flex items-center">
				<span className="w-56">
					SSP: {data.selectedSsp}, 계절: {data.selectedSeason}
				</span>
				<div
					className="rounded-2xl "
					style={{ width: "50px", height: "15px", backgroundColor: data.color }}
				/>

				<img onClick={onDelete} src="/delete.png" alt="삭제" className="h-8" />
			</div>
		</div>
	);
};

export default SimulationItem;
