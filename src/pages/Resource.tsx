import Header from "../components/Header";

export default function Resource() {
	return (
		<div className="relative flex flex-col h-screen overflow-hidden">
			<Header />
			<div className="flex flex-col overflow-y-auto bg-gray-200 grow">
				<div className="flex flex-col items-center w-full gap-3 ">
					<div className="w-full px-0 wide:px-32">
						<div className="flex items-start justify-start w-full mt-4 mb-4">
							<p className="text-4xl font-bold text-left px-20pxr wide:px-0">
								전 세계 기온 시각화 영상
							</p>
						</div>
						<div className="w-full h-full">
							<iframe
								src="https://youtube.com/embed/IabjwhqKuio?autoplay=1&mute=1"
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
						<div className="flex items-center justify-center w-20 h-16 bg-gray-700 tablet:w-40 web:w-60 wide:h-24 wide:w-80">
							<a
								href="https://github.com/ClimatePrediction2100"
								className="text-xl font-bold text-white web:text-4xl tablet:text-3xl wide:text-6xl"
								target="_blank"
							>
								GIT
							</a>
						</div>
						<div className="flex items-center justify-center w-20 h-16 bg-gray-700 tablet:w-40 web:w-60 wide:h-24 wide:w-80">
							<a
								href="https://github.com/ClimatePrediction2100/data/releases"
								className="text-xl font-bold text-white web:text-4xl tablet:text-3xl wide:text-6xl"
								target="_blank"
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
