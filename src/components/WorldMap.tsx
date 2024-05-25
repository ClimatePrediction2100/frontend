import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Layer, Path } from "leaflet";
import mergedNorthAmerica from "../data/MergedNorthAmerica.json";
import mergedAsia from "../data/MergedAsia.json";
import mergedSouthAmerica from "../data/MergedSouthAmerica.json";
import mergedAfrica from "../data/MergedAfrica.json";
import mergedEurope from "../data/MergedEurope.json";
import mergedOceania from "../data/MergedOceania.json";
import AN from "../data/AN.json";
import Simulation from "./Simulation";
import MainSimulation from "./MainSimulation";
import MainTemplate from "./MainTemplate";
import { useNavigate } from "react-router-dom";

// Define the styles for each continent
const getContinentStyle = (name: string) => {
	switch (name) {
		case "북아메리카":
			return { color: "#ff0000", weight: 1, fillOpacity: 0.5 };
		case "남아메리카":
			return { color: "#00ff00", weight: 1, fillOpacity: 0.5 };
		case "아프리카":
			return { color: "#0000ff", weight: 1, fillOpacity: 0.5 };
		case "유럽":
			return { color: "#ffff00", weight: 1, fillOpacity: 0.5 };
		case "오세아니아":
			return { color: "#ff00ff", weight: 1, fillOpacity: 0.5 };
		case "아시아":
			return { color: "#00ffff", weight: 1, fillOpacity: 0.5 };
		case "남극":
			return { color: "#462679", weight: 1, fillOpacity: 0.5 };
		default:
			return { color: "#888888", weight: 1, fillOpacity: 0.5 }; // Default style for other regions
	}
};

const WorldMap: React.FC = () => {
	const navigate = useNavigate();
	const [selectedContinent, setSelectedContinent] = useState<string | null>(
		"전 세계"
	);

	const onEachContinent = (continent: GeoJSON.Feature, layer: Layer) => {
		const continentName = (continent.properties as any).name || "Unknown";
		const style = getContinentStyle(continentName);

		if (layer instanceof Path) {
			layer.setStyle(style);
		}

		layer.on({
			mouseover: (e: L.LeafletMouseEvent) => {
				if (e.target instanceof Path) {
					e.target.setStyle({
						weight: 5,
						color: "#666",
						fillOpacity: 0.7,
					});
					const tooltipContent =
						continentName === "Unknown" ? "나머지" : continentName;
					e.target.bindTooltip(tooltipContent, { sticky: true }).openTooltip();
				}
			},
			mouseout: (e: L.LeafletMouseEvent) => {
				if (e.target instanceof Path) {
					e.target.setStyle(style);
					e.target.closeTooltip();
				}
			},
			click: () => {
				setSelectedContinent((prev) =>
					prev === continentName ? "전 세계" : continentName
				);
			},
		});
	};

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
	const [showTooltip, setShowTooltip] = useState(false);
	const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSeason(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = `/graph?name=${selectedContinent}&ssp=${selectedSsp}&season=${selectedSeason}`;
		navigate(url);
	};

	return (
		<div className="flex flex-col gap-10">
			<div style={{ display: "flex" }}>
				<MapContainer
					center={[20, 0]}
					zoom={2}
					minZoom={2}
					maxZoom={5}
					style={{ height: "500px", width: "80%" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						noWrap={true}
					/>
					<GeoJSON
						data={mergedNorthAmerica as any}
						onEachFeature={onEachContinent}
					/>
					<GeoJSON
						data={mergedSouthAmerica as any}
						onEachFeature={onEachContinent}
					/>
					<GeoJSON data={mergedAfrica as any} onEachFeature={onEachContinent} />
					<GeoJSON data={mergedEurope as any} onEachFeature={onEachContinent} />
					<GeoJSON
						data={mergedOceania as any}
						onEachFeature={onEachContinent}
					/>
					<GeoJSON data={mergedAsia as any} onEachFeature={onEachContinent} />
					<GeoJSON data={AN as any} onEachFeature={onEachContinent} />
				</MapContainer>
				<div
					className="flex flex-col items-center justify-center"
					style={{ width: "30%" }}
				>
					<form onSubmit={handleSubmit} className="flex gap-4 mt-2">
						<div className="flex flex-col items-center justify-center gap-10 p-4 bg-white rounded-xl">
							<div className="text-3xl font-bold">
								{selectedContinent || "전 세계"}
							</div>
							<div className="flex gap-2">
								<div className="custom-select">
									<div
										className="select-container"
										style={{ display: "flex", alignItems: "center" }}
										onMouseLeave={() => setShowTooltip(false)}
									>
										<label className="flex items-center h-6 text-sm">SSP</label>
										<img
											src="/question_mark.png"
											alt="SSP 설명"
											className="h-5 ml-1"
											onMouseEnter={() => setShowTooltip(true)}
										/>
										{showTooltip && (
											<div className="text-white tooltip-content">
												SSP : 각 국의 기후변화 예측모델로 온실가스 감축 수준 및
												기후변화 적응대책 수행 여부 등에 따라 미래 사회경제
												구조가 어떻게 달라질 것인지 고려한 시나리오
												<hr
													style={{
														marginTop: "8px",
														marginBottom: "8px",
														height: "4px",
													}}
												/>
												<div style={{ marginBottom: "8px" }}>
													자세한 사항은 다음 URL을 클릭하여 확인하세요
												</div>
												<a
													href="https://www.weather.go.kr/w/obs-climate/climate/climate-change/climate-change-scenario.do"
													style={{ marginBottom: "8px" }}
													target="_blank"
													rel="noreferrer"
												>
													https://www.weather.go.kr/w/obs-climate/climate/climate-change/climate-change-scenario.do
												</a>
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
							</div>

							<button
								type="submit"
								className="h-6 mt-auto custom-button"
								disabled={!selectedSeason && !selectedSsp}
							>
								<span className="text-base">예측하기</span>
							</button>
						</div>
					</form>
				</div>
			</div>
			<MainSimulation />
			<MainTemplate />
			<div className="h-5" />
		</div>
	);
};

export default WorldMap;
