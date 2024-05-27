import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const MainSimulation = () => {
	const navigate = useNavigate();
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
		if (latitude !== null && longitude !== null) {
			const url = `/graph?latitude=${latitude}&longitude=${longitude}&ssp=${selectedSsp}&season=${selectedSeason}`;
			navigate(url);
		}
	};

	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div className="flex flex-col w-full p-3 pl-5 bg-white shadow-lg rounded-2xl">
			<p className="text-2xl font-bold">위도 경도로 예측</p>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-2 gap-4 mt-2 web:flex"
			>
				<div className="flex flex-col custom-input">
					<label className="flex items-center h-6 text-sm">위도</label>
					<input
						className="w-60pxr web:w-120pxr"
						type="text"
						value={latitude}
						onChange={(e) => setLatitude(e.target.value)}
					/>
				</div>
				<div className="flex flex-col custom-input">
					<label className="flex items-center h-6 text-sm">경도</label>
					<input
						className="w-60pxr web:w-120pxr"
						type="text"
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}
					/>
				</div>
				<div className="custom-select">
					<label className="flex items-center h-6 text-sm">SSP</label>
					<select
						className="w-full web:w-150pxr"
						value={selectedSsp}
						onChange={handleSspChange}
					>
						{ssp.map((sspOption) => (
							<option key={sspOption} value={sspOption}>
								{sspOption}
							</option>
						))}
					</select>
				</div>
				<div className="custom-select">
					<label className="flex items-center h-6 text-sm">계절</label>
					<select
						className="w-full web:w-150pxr"
						value={selectedSeason}
						onChange={handleSeasonChange}
					>
						{season.map((seasonOption) => (
							<option key={seasonOption} value={seasonOption}>
								{seasonOption}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="w-full h-6 col-span-2 mt-auto custom-button web:w-120pxr"
					disabled={latitude === "" || longitude === ""}
				>
					<span className="text-base">확인</span>
				</button>
			</form>
		</div>
	);
};

export default MainSimulation;
