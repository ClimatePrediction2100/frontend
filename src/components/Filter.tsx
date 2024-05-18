interface FilterProps {
	selectedStartYear: number;
	selectedPeriod: number;
	selectedView: string;
	isVisibleWorld: string;
	years: number[];
	unit: number[];
	handleStartYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handlePeriodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleViewChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleIsVisibleWorld: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = ({
	selectedStartYear,
	selectedPeriod,
	selectedView,
	isVisibleWorld,
	years,
	unit,
	handleStartYearChange,
	handlePeriodChange,
	handleViewChange,
	handleIsVisibleWorld,
}: FilterProps) => {
	return (
		<div className="flex flex-col w-3/4 p-3 pl-5 bg-white shadow-lg rounded-2xl">
			<p className="text-2xl">Filter</p>
			<div className="flex gap-2 mt-2">
				<div className="custom-select">
					<label className="text-sm">시작 연도</label>
					<select
						value={selectedStartYear.toString()}
						onChange={handleStartYearChange}
					>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<div className="custom-select">
					<label className="text-sm">연도 단위</label>
					<select
						value={selectedPeriod.toString()}
						onChange={handlePeriodChange}
					>
						{unit.map((period) => (
							<option key={period} value={period}>
								{`${period}년`}
							</option>
						))}
					</select>
				</div>
				<div className="custom-select">
					<label className="text-sm">보기 방식</label>
					<select value={selectedView} onChange={handleViewChange}>
						<option value="전체 보기">전체 보기</option>
						<option value="평균 보기">평균 보기</option>
					</select>
				</div>
				<div className="custom-select">
					<label className="text-sm">전 세계(기준) 기온</label>
					<select value={isVisibleWorld} onChange={handleIsVisibleWorld}>
						<option value="표시">표시</option>
						<option value="미표시">미표시</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Filter;
