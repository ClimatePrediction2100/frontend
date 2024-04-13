import { useState } from "react";
import { getData } from "../api/getData";

const Simulation = ({ onSubmit }: any) => {
	const area = [
		"선택 안함",
		"대한민국",
		"미국",
		"호주",
		"유럽",
		"이란",
		"러시아",
	];
	const [selectedArea, setSelectedArea] = useState<string>("");

	const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLatitude("");
		setLongitude("");
		setSelectedArea(e.target.value);
	};

	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const ssp = [
		"SSP1-1.9",
		"SSP1-2.6",
		"SSP2-4.5",
		"SSP3-7.0",
		"SSP4-3.4",
		"SSP4-6.0",
		"SSP5-3.4",
		"SSP5-8.5",
	];
	const [selectedSsp, setSelectedSsp] = useState<string>("SSP1-1.9");
	const handleSspChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSsp(e.target.value);
	};

	const season = ["연평균", "봄", "여름", "가을", "겨울"];
	const [selectedSeason, setSelectedSeason] = useState<string>("연평균");
	const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSeason(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({
			selectedArea,
			latitude,
			longitude,
			selectedSsp,
			selectedSeason,
		});
	};

	const isDisabled = selectedArea !== "";
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div className="flex flex-col w-3/4 p-3 pl-5 bg-white shadow-lg rounded-2xl">
			<p className="text-2xl">추가 지역 Simulation</p>
			<form onSubmit={handleSubmit} className="flex gap-4 mt-2">
				<div className="custom-select">
					<label className="flex items-center h-6 text-sm">지역 선택</label>
					<select value={selectedArea} onChange={handleAreaChange}>
						{area.map((areaOption) => (
							<option
								key={areaOption}
								value={areaOption === "선택 안함" ? "" : areaOption}
							>
								{areaOption}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col custom-input">
					<label className="flex items-center h-6 text-sm">위도</label>
					<input
						type="text"
						value={latitude}
						onChange={(e) => setLatitude(e.target.value)}
						disabled={isDisabled}
					/>
				</div>
				<div className="flex flex-col custom-input">
					<label className="flex items-center h-6 text-sm">경도</label>
					<input
						type="text"
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}
						disabled={isDisabled}
					/>
				</div>
				<div className="custom-select">
					<div
						className="select-container"
						style={{ display: "flex", alignItems: "center" }}
					>
						<label className="flex items-center h-6 text-sm">SSP</label>
						<img
							src="/question_mark.png"
							alt="SSP 설명"
							className="h-5 ml-1"
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
						/>
						{showTooltip && (
							<div className="text-white tooltip-content">
								SSP는 8가지 상황에 의해 CO2 배출 증가에 따른 기온 상승을 가정한
								시뮬레이션입니다.
								<hr
									style={{
										marginTop: "8px",
										marginBottom: "8px",
										height: "4px",
									}}
								/>
								<div style={{ marginBottom: "8px" }}>SSP1-1.9 :</div>
								<div style={{ marginBottom: "8px" }}>SSP1-2.6 :</div>
								<div style={{ marginBottom: "8px" }}>SSP2-4.5 :</div>
								<div style={{ marginBottom: "8px" }}>SSP3-7.0 :</div>
								<div style={{ marginBottom: "8px" }}>SSP4-3.4 :</div>
								<div style={{ marginBottom: "8px" }}>SSP4-6.0 :</div>
								<div style={{ marginBottom: "8px" }}>SSP5-3.4 :</div>
								<div style={{ marginBottom: "8px" }}>SSP5-8.5 :</div>
							</div>
						)}
					</div>
					<select value={selectedSsp} onChange={handleSspChange}>
						{ssp.map((sspOption) => (
							<option key={sspOption} value={sspOption}>
								{sspOption}
							</option>
						))}
					</select>
				</div>
				<div className="custom-select">
					<label className="flex items-center h-6 text-sm">계절</label>
					<select value={selectedSeason} onChange={handleSeasonChange}>
						{season.map((seasonOption) => (
							<option key={seasonOption} value={seasonOption}>
								{seasonOption}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="h-6 mt-auto custom-button"
					disabled={!selectedArea && (latitude === "" || longitude === "")}
				>
					<span className="text-base">확인</span>
				</button>
			</form>
		</div>
	);
};

export default Simulation;
