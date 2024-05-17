import { useNavigate } from "react-router-dom";

const MainTemplate = () => {
	const navigate = useNavigate();
	const handleClickTemplate = (id: number) => {
		let url = "";
		switch (id) {
			case 1:
				url = `/graph?latitude=38&longitude=127&ssp=SSP1-2.6&name=대한민국 서울&season=연평균`;
				break;
			case 2:
				url = `/graph?latitude=36&longitude=140&ssp=SSP2-4.5&name=일본 도쿄&season=봄`;
				break;
			case 3:
				url = `/graph?latitude=41&longitude=-74&ssp=SSP3-7.0&name=미국 뉴욕&season=여름`;
				break;
			case 4:
				url = `/graph?latitude=52&longitude=0&ssp=SSP4-8.5&name=영국 런던&season=겨울`;
				break;
		}
		navigate(url);
	};
	return (
		<div className="flex flex-col w-full p-3 pl-5 bg-white shadow-lg rounded-2xl">
			<p className="mb-3 text-2xl font-bold">Template</p>
			<div className="grid grid-cols-2 gap-x-10 gap-y-4">
				<div
					className="flex justify-between w-full px-5 py-3 bg-gray-200 rounded-md cursor-pointer"
					onClick={() => handleClickTemplate(1)}
				>
					<div>대한민국 서울 (38°N 127°E)</div>
					<div>SSP1-2.6, 연평균</div>
				</div>
				<div
					className="flex justify-between w-full px-5 py-3 bg-gray-200 rounded-md cursor-pointer"
					onClick={() => {
						handleClickTemplate(2);
					}}
				>
					<div>일본 도쿄 (36°N 140°E)</div>
					<div>SSP2-4.5, 봄</div>
				</div>
				<div
					className="flex justify-between w-full px-5 py-3 bg-gray-200 rounded-md cursor-pointer"
					onClick={() => {
						handleClickTemplate(3);
					}}
				>
					<div>미국 뉴욕 (41°N -74°E)</div>
					<div>SSP3-7.0, 여름</div>
				</div>
				<div
					className="flex justify-between w-full px-5 py-3 bg-gray-200 rounded-md cursor-pointer"
					onClick={() => {
						handleClickTemplate(4);
					}}
				>
					<div>영국 런던 (52°N 0°E)</div>
					<div>SSP5-8.5, 겨울</div>
				</div>
			</div>
		</div>
	);
};

export default MainTemplate;
