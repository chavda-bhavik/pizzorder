module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				classy: {
					white: "#FAFAFA",
					deemLight: "#F5F2EE",
					lightGolden: "#ECD397",
					golden: "#E5AB41",
					slate: "#ADB8AE",
					lightBrown: "#D1B69C",
					// darker: '#242423',
					// dark: '#333533',
					// white: '#F2F2F2',
					// light: '#E8EDDF',
					// lighter: '#CFDBD5',
				},
			},
			fontFamily: {
				"archivo-light": ["Archivo Light", "sans"],
				archivo: ["Archivo", "sans"],
				"archivo-semibold": ["Archivo Semibold", "sans"],
				"archivo-bold": ["Archivo Bold", "sans"],
				"archivo-bolder": ["Archivo Bolder", "sans"],
			},
		},
	},
	plugins: [],
};
