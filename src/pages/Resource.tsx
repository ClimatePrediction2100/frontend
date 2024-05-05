import Header from "../components/Header";

export default function Resource() {
	return (
		<div className="relative flex flex-col h-screen overflow-hidden">
			<Header />
			<div className="flex flex-col overflow-y-auto bg-gray-200 grow">
				<div className="flex flex-col items-center w-full gap-3 ">
					<div className="w-full px-32">
						<div className="flex items-start justify-start w-full mt-4 mb-4">
							<p className="text-4xl font-bold text-left">
								전 세계 기온 시각화 영상
							</p>
						</div>
						<div className="w-full h-full">
							<iframe
								src="https://www.youtube.com/embed/0TNFb5zgpbg?autoplay=1&mute=1&controls=0&loop=1&playlist=0TNFb5zgpbg"
								title="YouTube video player"
								frameBorder="0"
								style={{ width: "100%", height: "575px" }}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
					<div className="w-full px-10">
						<div className="w-full h-2 mt-6 mb-6 bg-gray-400" />
					</div>
					<div className="flex gap-60">
						<div className="flex items-center justify-center h-24 bg-gray-700 w-80">
							<a
								href="https://github.com/ClimatePrediction2100"
								className="text-6xl font-bold text-white"
								target='_blank'
							>
								GIT
							</a>
						</div>
						<div className="flex items-center justify-center h-24 bg-gray-700 w-80">
							<a
								//href=""
								className="text-6xl font-bold text-white"
							>
								DATA
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
