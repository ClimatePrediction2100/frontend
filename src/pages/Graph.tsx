import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import GraphView from '../components/GraphView';
import Simulation from '../components/Simulation';
import SimulationItem from '../components/SimulationItem';
import { getData } from '../api/getData';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
interface TemperatureData {
	year: number;
	average?: number;
	highest?: number;
	lowest?: number;
}

export default function Graph() {
	const years: number[] = Array.from(
		{ length: 2100 - 1850 + 1 },
		(_, index) => 1850 + index
	);
	const unit: number[] = [1, 5, 10, 20];
	const [selectedStartYear, setSelectedStartYear] = useState<number>(1900);
	const [selectedPeriod, setSelectedPeriod] = useState<number>(5);
	const [selectedView, setSelectedView] = useState<string>('평균 보기');
	const [loading, setLoading] = useState<boolean>(true);

	const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStartYear(Number(e.target.value));
	};

	const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPeriod(Number(e.target.value));
	};

	const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedView(e.target.value);
	};

	const [yearList, setYearList] = useState<any>(years);
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

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	useEffect(() => {
		const initData = async (data: any, newName: string) => {
			let name = data.location || `${data.latitude}°N ${data.longitude}°E`;
			if (newName) name = newName;
			const response = await getData('temperature', data);
			console.log(response);
			const filterDataByYear = (
				data: TemperatureData[],
				key: keyof TemperatureData
			): { year: number; value: number }[] => {
				return data
					.filter(({ year }) => yearList.includes(year))
					.map(({ year, [key]: value }) => ({ year, value: value as number }));
			};

			const high: any[] = [
				...filterDataByYear(response.observeds, 'average'),
				...filterDataByYear(response.predicteds, 'highest'),
			];
			const aver: any[] = [
				...filterDataByYear(response.observeds, 'average'),
				...filterDataByYear(response.predicteds, 'average'),
			];
			const low: any[] = [
				...filterDataByYear(response.observeds, 'average'),
				...filterDataByYear(response.predicteds, 'lowest'),
			];
			const color = getRandomColor();
			setData((prevData: any) => [
				...prevData,
				{ name, color, high, aver, low },
			]);
		};
		const getTwoData = async () => {
			setLoading(true);
			const queryParams = new URLSearchParams(location.search);
			const locations = queryParams.get('name');
			const latitude = queryParams.get('latitude');
			const longitude = queryParams.get('longitude');
			const qssp = queryParams.get('ssp');
			const qseason = queryParams.get('season');
			const selectedSsp = qssp;
			const selectedSeason = qseason;

			const data1: any = {};
			const area = [
				'전 세계',
				'아시아',
				'유럽',
				'아프리카',
				'북아메리카',
				'남아메리카',
				'오세아니아',
				'남극',
			];
			if (locations && area.includes(locations)) data1.location = locations;
			if (latitude) data1.latitude = latitude;
			if (longitude) data1.longitude = longitude;
			if (selectedSsp) data1.ssp = selectedSsp;
			if (selectedSeason) data1.season = selectedSeason;

			await initData(
				{
					location: '전 세계',
					ssp: 'SSP2-4.5',
					season: '연평균',
				},
				'전 세계(SSP2-4.5)'
			);
			await initData(data1, locations!);
			setLoading(false);
		};

		getTwoData();
	}, []);

	const [graphData, setGraphData] = useState<any>({});
	function getRandomColor() {
		const r = Math.floor(Math.random() * 256); // 0-255
		const g = Math.floor(Math.random() * 256); // 0-255
		const b = Math.floor(Math.random() * 256); // 0-255
		const a = 1;
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}
	
	useEffect(() => {
		let dataset: any = [];
		data.forEach((set: any, index: number) => {
			// 데이터 필터링
			const filterHigh = set.high
				.filter((item: any) => yearList.includes(item.year))
				.map((item: any) => item.value);
			const filterAver = set.aver
				.filter((item: any) => yearList.includes(item.year))
				.map((item: any) => item.value);
			const filterLow = set.low
				.filter((item: any) => yearList.includes(item.year))
				.map((item: any) => item.value);
			if (selectedView === '전체 보기') {
				dataset.push({
					label: `${set.name} 최고`,
					data: filterHigh,
					borderColor: set.color,
					backgroundColor: set.color,
					lineTension: 0.5,
					borderWidth: 0.5,
					pointRadius: 1.5,
					pointHitRadius: 3,
					spanGaps: 10,
				});
				dataset.push({
					label: `${set.name}`,
					data: filterAver,
					borderColor: set.color,
					backgroundColor: set.color,
					lineTension: 0.5,
					borderWidth: 2,
					pointRadius: 1.5,
					pointHitRadius: 3,
					spanGaps: 10,
				});
				dataset.push({
					label: `${set.name} 최저`,
					data: filterLow,
					borderColor: set.color,
					backgroundColor: set.color,
					lineTension: 0.5,
					borderWidth: 0.5,
					pointRadius: 1.5,
					pointHitRadius: 3,
					spanGaps: 10,
				});
			} else if (selectedView === '평균 보기') {
				dataset.push({
					label: set.name,
					data: filterAver,
					borderColor: set.color,
					backgroundColor: set.color,
					lineTension: 0.5,
					borderWidth: 2,
					pointRadius: 1.5,
					pointHitRadius: 3,
					spanGaps: 10,
				});
			}
		});

		// 그래프 데이터 설정
		setGraphData({
			labels: yearList,
			datasets: dataset,
		});
		setShowData(true);
	}, [data, yearList, selectedView]);

	// 추가 지역 시뮬레이션 관련 메소드
	const [simulationDataList, setSimulationDataList] = useState<any>([]);

	const handleSimulationSubmit = async (newData: any) => {
		setLoading(true);
		let response;
		const selectedSsp = newData.selectedSsp;
		const selectedSeason = newData.selectedSeason;
		if (newData.selectedArea === '') {
			const requestData = {
				latitude: newData.latitude,
				longitude: newData.longitude,
				ssp: selectedSsp,
				season: selectedSeason,
			};
			response = await getData('temperature', requestData);
		} else {
			const requestData = {
				location: newData.selectedArea,
				ssp: selectedSsp,
				season: selectedSeason,
			};
			response = await getData('temperature', requestData);
		}

		const filterDataByYear = (
			data: TemperatureData[],
			key: keyof TemperatureData
		): { year: number; value: number }[] => {
			return data.map(({ year, [key]: value }) => ({
				year,
				value: value as number,
			}));
		};

		const high: any[] = [
			...filterDataByYear(response.observeds, 'average'),
			...filterDataByYear(response.predicteds, 'highest'),
		];
		const aver: any[] = [
			...filterDataByYear(response.observeds, 'average'),
			...filterDataByYear(response.predicteds, 'average'),
		];
		const low: any[] = [
			...filterDataByYear(response.observeds, 'average'),
			...filterDataByYear(response.predicteds, 'lowest'),
		];
		let name: any;
		if (newData.selectedArea === '') {
			name = `${newData.latitude}°N ${newData.longitude}°E`;
		} else {
			name = newData.selectedArea;
		}
		const color = getRandomColor();
		newData = { ...newData, color };
		setData((prevData: any) => [...prevData, { name, color, high, aver, low }]);

		setSimulationDataList((prevList: any) => [...prevList, newData]);
		setLoading(false);
	};

	const handleDelete = (indexToDelete: any) => {
		setSimulationDataList((prevList: any[]) =>
			prevList.filter((_, index) => index !== indexToDelete)
		);
		setData((prevList: any[]) =>
			prevList.filter((_, index) => index !== indexToDelete + 2)
		);
	};

	const [isVisibleWorld, setIsVisibleWorld] = useState('표시');
	const handleIsVisibleWorld = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setIsVisibleWorld(e.target.value);
	};

	return (
		<div className="flex flex-col h-screen overflow-x-hidden min-w-430pxr">
			<Header />
			<div className="flex flex-col overflow-y-auto bg-gray-200 web:px-10 grow">
				<div className="flex flex-col items-center w-full gap-3 mt-10">
					<div className="w-full web:w-3/4 px-20pxr web:px-0">
						<p className="flex flex-col items-start text-3xl font-semibold text-left web:items-center web:gap-10pxr web:flex-row">
							{queryParams.get('name')
								? queryParams.get('name')
								: `${queryParams.get('latitude')}°N ${queryParams.get(
										'longitude'
								  )}°E`}{' '}
							<span className="text-2xl text-gray-500">
								{queryParams.get('ssp')}, {queryParams.get('season')}
							</span>
						</p>
					</div>
					<Filter
						selectedStartYear={selectedStartYear}
						selectedPeriod={selectedPeriod}
						selectedView={selectedView}
						isVisibleWorld={isVisibleWorld}
						years={years}
						unit={unit}
						handleStartYearChange={handleStartYearChange}
						handlePeriodChange={handlePeriodChange}
						handleViewChange={handleViewChange}
						handleIsVisibleWorld={handleIsVisibleWorld}
					/>
					<div className='w-full h-96 flex flex-row items-center justify-center'>
					{loading ? (
						<Spinner />
					) : (
						showData && (
							<GraphView
								data={graphData}
								isVisible={isVisibleWorld === '표시'}
							/>
						)
					)}
					</div>
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
