const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			transitionProperty: {
				height: 'height'
			},

			screens: {
				'xs': '300px',
				'sm': '450px',
				'xs-height': { raw: '(max-height:400px)' }
			}
		},
		colors: {
			'atomy-blue-primary': '#04a6e1',
			'atomy-gray-primary': '#d0d3d5',
			'white': colors.white,
			'gray': colors.gray,
			'sky': colors.sky,
			'green': colors.green
		}
	},
	plugins: []
};
