import { Link } from "react-router-dom";

export default function Header() {
	return (
		<div className="flex items-center justify-between h-20 px-56 py-4 font-bold bg-white">
			<div className="flex">
				<Link to="/">
					<img src="/logo.png" className="h-8" alt="Logo" />
				</Link>
				<Link to="/">
					<p className="ml-4 text-lg">Climate Prediction 2100</p>
				</Link>
			</div>
			<Link to="/resource">
				<p className="">Project Resource</p>
			</Link>
		</div>
	);
}
