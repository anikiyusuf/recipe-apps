module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'no-unused-vars': 'error',
		'react-refresh/only-export-components': 'warn',
		'indent': ['error', 'tab'],
		'linebreak-style': ['error','windows'],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'eol-last': [
			'error',
			'always'
		],
	},
}
