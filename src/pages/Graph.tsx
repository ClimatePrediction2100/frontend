import { useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import GraphView from "../components/GraphView";
import Simulation from "../components/Simulation";
import SimulationItem from "../components/SimulationItem";

export default function Graph() {
	/**
	 * 그래프 관련 상태 및 메소드
	 */
	const years: number[] = Array.from(
		{ length: 2100 - 1900 + 1 },
		(_, index) => 1900 + index
	);
	const unit: number[] = [1, 5, 10, 20];
	const [selectedStartYear, setSelectedStartYear] = useState<number>(1900);
	const [selectedPeriod, setSelectedPeriod] = useState<number>(20);
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

	const data = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
		],
		datasets: [
			{
				label: "Dataset 1",
				data: [
					-500, 750, 200, -300, 400, -150, 250, -500, 750, 200, -300, 400, -150,
					250,
				],
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Dataset 2",
				data: [
					200, 450, -400, 300, -650, 100, 900, -500, 750, 200, -300, 400, -150,
					250,
				],
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

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
		<div className="h-screen flex flex-col overflow-x-hidden">
			<Header />
			<div className="pl-10 pr-10 bg-gray-200 grow flex flex-col overflow-y-auto">
				<div className="flex flex-col gap-3 mt-10 w-full items-center">
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
					<GraphView data={data} />
					<Simulation onSubmit={handleSimulationSubmit} />
					<div className="flex flex-col gap-3 w-full flex-grow items-center">
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
