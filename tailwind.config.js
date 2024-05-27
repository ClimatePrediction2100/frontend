/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

const pxToRem = (px, base = 16) => `${px / base}rem`;

const generateBrightnessValues = () => {
	const brightnessValues = {};
	for (let i = 0; i <= 200; i += 5) {
		brightnessValues[`${i}`] = `${i / 100}`;
	}
	return brightnessValues;
};

const config = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			tablet: "576px",
			web: "912px",
			wide: "1200px",
		},
		extend: {
			fontFamily: {
				pretendard: ["Pretendard", ...fontFamily.sans],
			},
			borderWidth: Array.from({ length: 1000 }, (_, index) => {
				const value = pxToRem(index + 1);
				return { [`${index + 1}pxr`]: value };
			}).reduce((acc, obj) => ({ ...acc, ...obj }), {}),
			borderRadius: Array.from({ length: 1000 }, (_, index) => {
				const value = pxToRem(index + 1);
				return { [`${index + 1}pxr`]: value };
			}).reduce((acc, obj) => ({ ...acc, ...obj }), {
				"web-content": "40px",
				"mobile-content": "45px",
				full: "9999px",
			}),
			spacing: Array.from({ length: 1000 }, (_, index) => {
				const value = pxToRem(index + 1);
				return { [`${index + 1}pxr`]: value };
			}).reduce((acc, obj) => ({ ...acc, ...obj }), {
				1280: "1280px",
				1200: "1200px",
				1100: "1100px",
			}),
			fontSize: Array.from({ length: 1000 }, (_, index) => {
				const value = pxToRem(index + 1);
				return { [`${index + 1}pxr`]: value };
			}).reduce((acc, obj) => ({ ...acc, ...obj }), {}),
			minWidth: {
				1280: "1280px",
				1200: "1200px",
			},
			maxWidth: {
				1280: "1280px",
				1200: "1200px",
			},
			brightness: generateBrightnessValues(),
			boxShadow: {
				"reserve-summary-shadow": "0 -4px 6px rgba(0, 0, 0, 0.05)",
			},
		},
	},
};
export default config;
