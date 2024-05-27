import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Intro() {
	return (
		<div className="relative flex flex-col h-screen overflow-hidden min-w-430pxr">
			<Header />
			<div className="relative flex-grow w-full">
				<img
					src="/image_intro_background.png"
					className="absolute inset-0 w-full h-full"
					alt="Background"
				/>
				<div className="absolute flex flex-col items-center w-full top-36">
					<p className="text-xl font-bold leading-tight text-center text-white select-none text-ellipsis line-clamp-3 tablet:text-4xl web:text-7xl drop-shadow-lg">
						지역적 기후 모델링을 통한 전 지구적 기후 모델링
						<br />
						기온 변화 추세 시각화 웹 서비스
					</p>
				</div>
				<div className="absolute flex items-center justify-center transform -translate-x-1/2 bottom-56 left-1/2">
					<Link to="/main">
						<div className="py-4 px-8 bg-[#A3CAD2] bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg hover:bg-[#DEDEDE] hover:bg-opacity-70 cursor-pointer transition duration-300 ease-in-out">
							<p className="text-2xl font-bold text-gray-800 web:text-6xl tablet:text-4xl">
								Start
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
