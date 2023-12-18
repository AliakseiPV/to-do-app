/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				purple1: '#C8B6FF',
				lightpurple: '#E7C6FF',
				sweetpink: '#FFD6FF',
				babyblue: '#B8C0FF',
				lightblue: '#BBD0FF',
				bgwhite:'#F9F9F9',
			}
		},
	},
	plugins: [],
}

