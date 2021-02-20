module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			backgroundColor: ["group-hover", "hover"],
			borderColor: ["first", "last", "hover", "focus"],
			borderWidth: ["first", "hover", "focus", "last"],
			display: ["group-hover"],
			maxWidth: ["responsive"],
			padding: ["first", "last"],
		},
	},
	plugins: [],
};
