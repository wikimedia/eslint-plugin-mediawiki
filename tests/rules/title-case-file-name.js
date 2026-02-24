'use strict';

const path = require( 'upath' );
const rule = require( '../../src/rules/title-case-file-name' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester( {
	parserOptions: { ecmaVersion: 2019 }
} );

ruleTester.run( 'title-case-file-name', rule, {
	docgenConfig: {
		showFilenames: true
	},
	valid: [
		{
			code: 'var fooBar = true;',
			filename: path.resolve( __dirname, '../sandbox/FooBar.js' )
		},
		{
			code: 'var fooBarTest = true;',
			filename: path.resolve( __dirname, '../sandbox/FooBarTest.js' ),
			docgen: false
		},
		{
			code: 'var testFooBar = true;',
			filename: path.resolve( __dirname, '../sandbox/TestFooBar.js' ),
			docgen: false
		},
		{
			code: 'var fooBarDotTest = true;',
			filename: path.resolve( __dirname, '../sandbox/FooBar.test.js' )
		},
		{
			code: 'var indexFile = true;',
			filename: path.resolve( __dirname, '../sandbox/index.js' )
		},
		{
			code: 'var eslintConfig = true;',
			filename: path.resolve( __dirname, '../sandbox/.eslintrc.js' ),
			docgen: false
		},
		{
			code: 'var cssFile = true;',
			filename: path.resolve( __dirname, '../sandbox/foo-bar.css' ),
			docgen: false
		},
		{
			code: 'var fooBarVue = true;',
			filename: path.resolve( __dirname, '../sandbox/FooBar.vue' )
		}
	],
	invalid: [
		{
			code: 'var lowerCamelCaseName = true;',
			filename: path.resolve( __dirname, '../sandbox/fooBar.js' ),
			errors: [ { messageId: 'notTitleCase', data: { filename: 'fooBar.js' } } ]
		},
		{
			code: 'var kebabCaseName = true;',
			filename: path.resolve( __dirname, '../sandbox/foo-bar.js' ),
			errors: [ { messageId: 'notTitleCase', data: { filename: 'foo-bar.js' } } ]
		},
		{
			code: 'var snakeCaseName = true;',
			filename: path.resolve( __dirname, '../sandbox/foo_bar.js' ),
			errors: [ { messageId: 'notTitleCase', data: { filename: 'foo_bar.js' } } ],
			docgen: false
		},
		{
			code: 'var lowerCaseDotTest = true;',
			filename: path.resolve( __dirname, '../sandbox/foo.test.js' ),
			errors: [ { messageId: 'notTitleCase', data: { filename: 'foo.test.js' } } ]
		},
		{
			code: 'var lowerCamelCaseVue = true;',
			filename: path.resolve( __dirname, '../sandbox/fooBar.vue' ),
			errors: [ { messageId: 'notTitleCase', data: { filename: 'fooBar.vue' } } ]
		}
	]
} );
