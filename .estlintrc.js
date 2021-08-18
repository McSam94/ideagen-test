module.exports = {
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended'
	],
	env: {
		es6: true,
		node: true,
		browser: true,
		'jest/globals': true
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		}
	},
	ignorePatterns: ['/node_modules/**', '/www/index.bundle.js'],
	rules: {
		'no-unused-vars': [
			'error',
			{ args: 'none', argsIgnorePattern: 'req|res|next|val' }
		],
		semi: 'error',
		'no-use-before-define': 'error',
		'prefer-const': 'error',
		'no-console': 'warn',
		'prettier/prettier': ['error'],
		'react/display-name': ['off'],
		'react/prop-types': [2, { ignore: ['children'] }]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
