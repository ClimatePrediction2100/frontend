import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<div className="h-20 bg-white flex items-center px-4 font-bold pl-56 py-4">
			<Link to="/">
				<img src="/logo.png" className="h-8" alt="Logo" />
      		</Link>
			<Link to="/">
			<p className="text-lg ml-4">Climate Prediction 2100</p>
			</Link>
		</div>
	);
}