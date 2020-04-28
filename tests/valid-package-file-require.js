const rule = require( '../rules/valid-package-file-require' );
const path = require( 'path' );
const RuleTester = require( 'eslint' ).RuleTester;

const ruleTester = new RuleTester();
const testFileName = path.resolve( __dirname + '/sandbox/test.js' );

ruleTester.run( 'valid-package-file-require', rule, {
	valid: [
		{
			// Not valid code, but out of scope for this rule
			code: 'var foo = require();',
			filename: testFileName
		},
		{
			code: 'var foo = require( \'./foo.js\' );',
			filename: testFileName
		},
		{
			code: 'var foo = require( \'./quux.json\' );',
			filename: testFileName
		},
		{
			code: 'var foo = require( \'./virtual.json\' );',
			filename: testFileName
		},
		{
			code: 'var bar = require( \'../valid-package-file-require.js\' );',
			filename: testFileName
		},
		{
			code: 'var foo = require( \'foo\' );',
			filename: testFileName
		},
		{
			code: 'var bar = require( \'bar\' );',
			filename: testFileName
		},
		{
			code: 'var foo = require( \'../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' )
		},
		{
			code: 'var foo = require( \'./../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' )
		}
	],

	invalid: [
		{
			code: 'var foo = require( \'./foo\' );',
			output: 'var foo = require( \'./foo.js\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./foo.js instead' }
			]
		},
		{
			code: 'var foo = require( \'../foo\' );',
			output: 'var foo = require( \'../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' ),
			errors: [
				{ message: 'Incorrect file path in require(): use ../foo.js instead' }
			]
		},
		{
			code: 'var foo = require( \'foo.js\' );',
			output: 'var foo = require( \'./foo.js\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./foo.js instead' }
			]
		},
		{
			code: 'var foo = require( \'./quux\' );',
			output: 'var foo = require( \'./quux.json\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./quux.json instead' }
			]
		},
		{
			code: 'var foo = require( \'quux.json\' );',
			output: 'var foo = require( \'./quux.json\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./quux.json instead' }
			]
		}
	]
} );
