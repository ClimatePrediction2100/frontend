export const getData = async (url: string, data: any) => {
	const params = new URLSearchParams(data);
	const response = await fetch(
		`https://api.climateprediction.xyz/${url}?${params.toString()}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return response.json();
};
