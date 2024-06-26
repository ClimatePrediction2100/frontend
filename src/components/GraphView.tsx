import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'right' as const,
			labels: {
				filter: function (legendItem: any, legend: any) {
					return !(
						legendItem.text.includes('최고') || legendItem.text.includes('최저')
					);
				},
			},
			onClick: (e: any, legendItem: any, legend: any) => {
				// const index = legendItem.datasetIndex;
				// const type = legend.chart.config.type;
				// let ci = legend.chart;
				// [
				// 	ci.getDatasetMeta(index),
				// 	ci.getDatasetMeta(index+1),
				// 	ci.getDatasetMeta(index+2),
				// ].forEach(function (meta) {
				// 	meta.hidden =
				// 		meta.hidden === null ? !ci.data.datasets[index].hidden : null;
				// });
				// ci.update();
			},
		},
		tooltip: {
			enabled: true,
			filter: function (item: any, data: any) {
				return (
					item.label > 2023 ||
					item.datasetIndex % 3 === 1 ||
					!(
						item.dataset.label.includes('최고') ||
						item.dataset.label.includes('최저')
					)
				);
			},
		},
	},
};

const GraphView = ({ data, isVisible }: { data: any; isVisible: boolean }) => {
	const processData = (datasets: any[]) => {
		return datasets.map((dataset, index) => {
			if (dataset.label.includes('전 세계(SSP2-4.5)')) {
				return { ...dataset, hidden: !isVisible };
			}
			return dataset;
		});
	};

	const processedData = {
		labels: data.labels,
		datasets: processData(data.datasets),
	};

	return (
		<div className="flex flex-col w-full p-3 pl-5 bg-white shadow-lg web:w-3/4 rounded-2xl h-full">
			<p className="text-2xl">Graph</p>
			<div className="flex items-center justify-center gap-10 mt-2 h-full">
				<Line options={options} data={processedData} height={300} />
			</div>
		</div>
	);
};

export default GraphView;