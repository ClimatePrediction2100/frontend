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
		},
		tooltip: {
			enabled: true, // 툴팁 활성화
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
