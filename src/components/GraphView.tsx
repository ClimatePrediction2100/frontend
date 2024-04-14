import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
			position: "right" as const,
			labels: {
				filter: function (legendItem: any, legend: any) {
					return !(
						legendItem.text.includes("최고") || legendItem.text.includes("최저")
					);
				},
			},
			onClick: (e: any, legendItem: any, legend: any) => {
				// const index = legendItem.datasetIndex;
				// const type = legend.chart.config.type;
				// let ci = legend.chart;
				// [
				// 	ci.getDatasetMeta(0),
				// 	ci.getDatasetMeta(1),
				// 	ci.getDatasetMeta(2),
				// ].forEach(function (meta) {
				// 	meta.hidden =
				// 		meta.hidden === null ? !ci.data.datasets[index].hidden : null;
				// });
				// ci.update()
			},
		},
		tooltip: {
			enabled: true,
			filter: function (item: any, data: any) {
				return item.label > 2014 || item.datasetIndex === 1;
			},
		},
	},
};

const GraphView = ({ data }: any) => {
	return (
		<div className="flex flex-col w-3/4 p-3 pl-5 bg-white shadow-lg rounded-2xl">
			<p className="text-2xl">Graph</p>
			<div className="flex items-center justify-center gap-10 mt-2">
				<Line options={options} data={data} height={300} />
			</div>
		</div>
	);
};

export default GraphView;
