/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				garamond: ['EB Garamond', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
				firaMono: ['Fira Mono', 'monospace'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
