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
	},
};

const GraphView = ({ data }: any) => {
	return (
		<div className="bg-white w-3/4 rounded-2xl shadow-lg p-3 pl-5 flex flex-col">
			<p className="text-2xl">Graph</p>
			<div className="flex gap-10 mt-2 items-center justify-center">
				<Line options={options} data={data} height={300} />
			</div>
		</div>
	);
};

export default GraphView;
