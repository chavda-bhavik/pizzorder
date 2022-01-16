module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
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
		},
	},
	plugins: [],
};
