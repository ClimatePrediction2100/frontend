import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Intro () {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-grow w-full relative">
        <img src="/image_intro_background.png" className="absolute inset-0 w-full h-full" alt="Background" />
        <div className="absolute top-36 flex flex-col items-center w-full">
          <p className="text-center text-7xl font-bold text-white leading-tight select-none drop-shadow-lg">
            지역적 기후 모델링을 통한 전 지구적 기후 모델링<br />
            기온 변화 추세 시각화 웹 서비스
          </p>
        </div>
        <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
          <Link to="/graph">
            <div className="py-4 px-8 bg-[#A3CAD2] bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg hover:bg-[#DEDEDE] hover:bg-opacity-70 cursor-pointer transition duration-300 ease-in-out">
              <p className="text-6xl font-bold text-gray-800">Start</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
