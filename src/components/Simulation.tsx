import { useState } from "react";

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
		setSelectedArea(e.target.value);
	};

	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [co2, setCo2] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({
			selectedArea,
			latitude,
			longitude,
			co2,
		});
	};

	const isDisabled = selectedArea !== "";

	return (
		<div className="bg-white w-3/4 rounded-2xl shadow-lg p-3 pl-5 flex flex-col">
			<p className="text-2xl">추가 지역 Simulation</p>
			<form onSubmit={handleSubmit} className="flex gap-4 mt-2">
				<div className="custom-select">
					<label className="text-sm">지역 선택</label>
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
					<label className="text-sm">위도</label>
					<input
						type="text"
						value={latitude}
						onChange={(e) => setLatitude(e.target.value)}
						disabled={isDisabled}
					/>
				</div>
				<div className="flex flex-col custom-input">
					<label className="text-sm">경도</label>
					<input
						type="text"
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}
						disabled={isDisabled}
					/>
				</div>
				<div className="flex flex-col custom-input">
					<label className="text-sm">CO2 농도 조절</label>
					<input
						type="text"
						value={co2}
						onChange={(e) => setCo2(e.target.value)}
					/>
				</div>
				<button type="submit" className="mt-auto custom-button">
					확인
				</button>
			</form>
		</div>
	);
};

export default Simulation;
