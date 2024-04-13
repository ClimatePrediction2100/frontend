import { useEffect, useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import GraphView from "../components/GraphView";
import Simulation from "../components/Simulation";
import SimulationItem from "../components/SimulationItem";
import { getData } from "../api/getData";
interface TemperatureData {
	year: number;
	average?: number;
	highest?: number;
	lowest?: number;
}
export default function Graph() {
	/**
	 * 그래프 관련 상태 및 메소드
	 */
	const years: number[] = Array.from(
		{ length: 2100 - 1850 + 1 },
		(_, index) => 1850 + index
	);
	const unit: number[] = [1, 5, 10, 20];
	const [selectedStartYear, setSelectedStartYear] = useState<number>(1920);
	const [selectedPeriod, setSelectedPeriod] = useState<number>(5);
	const [selectedView, setSelectedView] = useState<string>("전체 보기");

	const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStartYear(Number(e.target.value));
	};

	const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPeriod(Number(e.target.value));
	};

	const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedView(e.target.value);
	};

	const [yearList, setYearList] = useState<any>([]);
	useEffect(() => {
		const updatedYearList = years.filter(
			(year) =>
				(year >= selectedStartYear &&
					(year - selectedStartYear) % selectedPeriod === 0) ||
				year === 2100
		);
		setYearList(updatedYearList);
	}, [selectedStartYear, selectedPeriod]);

	const [showData, setShowData] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	useEffect(() => {
		const initData = async () => {
			const requestData = {
				latitude: 0,
				longitude: 0,
				ssp: 1,
				season: 1,
			};
			const response = await getData("temperature", requestData);

			// 필터링 로직 적용
			const filterDataByYear = (
				data: TemperatureData[],
				key: keyof TemperatureData
			): any[] => {
				return data
					.filter(({ year }) => yearList.includes(year))
					.map(({ [key]: value }) => value as number);
			};

			const high: any[] = [
				...filterDataByYear(response.observeds, "average"),
				...filterDataByYear(response.predicteds, "highest"),
			];
			const aver: any[] = [
				...filterDataByYear(response.observeds, "average"),
				...filterDataByYear(response.predicteds, "average"),
			];
			const low: any[] = [
				...filterDataByYear(response.observeds, "average"),
				...filterDataByYear(response.predicteds, "lowest"),
			];
			const name = "대한민국";
			setData([{ name, high, aver, low }]);
		};

		if (yearList.length > 0) {
			initData();
		}
	}, [yearList]);

	const [graphData, setGraphData] = useState<any>({});
	useEffect(() => {
		let dataset: any = [];
		data.forEach((set: any, index: number) => {
			dataset.push({
				data: set.high,
				borderColor: "rgb(0, 99, 132)",
				backgroundColor: "rgba(0, 99, 132, 0.5)",
				borderWidth: 0,
				pointRadius: 2,
			});
			dataset.push({
				label: set.name,
				data: set.aver,
				borderColor: "rgb(0, 99, 132)",
				backgroundColor: "rgba(0, 99, 132, 0.5)",
				borderWidth: 1,
				pointRadius: 2,
			});
			dataset.push({
				data: set.low,
				borderColor: "rgb(0, 99, 132)",
				backgroundColor: "rgba(0, 99, 132, 0.5)",
				borderWidth: 0,
				pointRadius: 2,
			});
		});
		setGraphData({
			labels: yearList,
			datasets: dataset,
		});
		setShowData(true);
		console.log({
			labels: yearList,
			datasets: dataset,
		});
	}, [data]);

	/**
	 * 추가 지역 시뮬레이션 관련 메소드
	 */
	// Simulation 데이터 리스트를 관리할 상태
	const [simulationDataList, setSimulationDataList] = useState<any>([]);

	const handleSimulationSubmit = (newData: any) => {
		// 새로운 데이터를 기존 리스트에 추가
		setSimulationDataList((prevList: any) => [...prevList, newData]);
	};

	const handleDelete = (indexToDelete: any) => {
		// 삭제하려는 인덱스를 제외하고 새 리스트를 생성
		setSimulationDataList((prevList: any[]) =>
			prevList.filter((_, index) => index !== indexToDelete)
		);
	};
	return (
		<div className="flex flex-col h-screen overflow-x-hidden">
			<Header />
			<div className="flex flex-col pl-10 pr-10 overflow-y-auto bg-gray-200 grow">
				<div className="flex flex-col items-center w-full gap-3 mt-10">
					<div className="w-3/4">
						<p className="text-3xl font-semibold text-left">대한민국 서울</p>
					</div>
					<Filter
						selectedStartYear={selectedStartYear}
						selectedPeriod={selectedPeriod}
						selectedView={selectedView}
						years={years}
						unit={unit}
						handleStartYearChange={handleStartYearChange}
						handlePeriodChange={handlePeriodChange}
						handleViewChange={handleViewChange}
					/>
					{showData && <GraphView data={graphData} />}
					<Simulation onSubmit={handleSimulationSubmit} />
					<div className="flex flex-col items-center flex-grow w-full gap-3">
						{simulationDataList.map((data: any, index: number) => (
							<SimulationItem
								data={data}
								key={index}
								onDelete={() => handleDelete(index)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
