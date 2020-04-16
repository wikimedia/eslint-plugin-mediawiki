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
			code: 'var foo = require( \'./quux.json\' );',
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
			filename: testFileName,
			errors: [
				{ message: 'bad resource loader package file path' }
			]
		},
		{
			code: 'var foo = require( \'../foo\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' ),
			errors: [
				{ message: 'bad resource loader package file path' }
			]
		{
			code: 'var foo = require( \'foo.js\' );',
			filename: testFileName,
			errors: [
				{ message: 'bad resource loader package file path' }
			]
		},
		{
			code: 'var foo = require( \'./quux\' );',
			filename: testFileName,
			errors: [
				{ message: 'bad resource loader package file path' }
			]
		},
		{
			code: 'var foo = require( \'quux.json\' );',
			filename: testFileName,
			errors: [
				{ message: 'bad resource loader package file path' }
			]
		}
	]
} );
