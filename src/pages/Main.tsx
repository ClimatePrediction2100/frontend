import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Main() {
	return (
		<div className="relative flex flex-col h-screen overflow-hidden">
			<Header />
			<div className="flex flex-col pl-10 pr-10 overflow-y-auto bg-gray-200 grow">
				<div className="flex flex-col items-center w-full gap-3 mt-10">
					<div className="w-3/4">
						<p className="text-3xl font-semibold text-left">메인페이지</p>
						<Link to="/graph">
							<p className="mt-5 text-2xl text-left">통계페이지</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
