const rule = require( '../rules/valid-package-file-require' );
const path = require( 'path' );
const RuleTester = require( 'eslint' ).RuleTester;

const ruleTester = new RuleTester();
const testFileName = path.resolve( __dirname + '/sandbox/test.js' );

ruleTester.run( 'valid-package-file-require', rule, {
	valid: [
		{
			code: 'var foo = require( \'./foo.js\' );',
			filename: testFileName
		},
		{
			code: 'var bar = require( \'bar\' );',
			filename: testFileName
		}
	],

	invalid: [
		{
			code: 'var foo = require( \'./foo\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./foo.js instead' }
			]
		},
		{
			code: 'var foo = require( \'foo.js\' );',
			filename: testFileName,
			errors: [
				{ message: 'Incorrect file path in require(): use ./foo.js instead' }
			]
		}
	]
} );
