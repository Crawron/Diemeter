const colors = require("tailwindcss/colors")

module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			borderRadius: {
				DEFAULT: "3px",
			},
			colors: {
				blueGray: colors.blueGray,
			},
			fontFamily: {
				sans: ["Inter"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
