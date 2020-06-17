'use strict';

const rule = require( '../src/rules/valid-package-file-require' );
const path = require( 'upath' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester();
const testFileName = path.resolve( __dirname + '/sandbox/test.js' );

ruleTester.run( 'valid-package-file-require', rule, {
	valid: [
		// Not valid code, but out of scope for this rule
		'var foo = require();',
		'var foo = require( \'./foo.js\' );',
		'var foo = require( \'./quux.json\' );',
		'var foo = require( \'./virtual.json\' );',
		'var bar = require( \'../valid-package-file-require.js\' );',
		'var foo = require( \'foo\' );',
		'var bar = require( \'bar\' );',
		{
			code: 'var foo = require( \'../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' )
		},
		{
			code: 'var foo = require( \'./../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' )
		}
	].map( ( test ) => Object.assign( {
		filename: testFileName
	}, typeof test === 'string' ? { code: test } : test ) ),

	invalid: [
		{
			code: 'var foo = require( \'./foo\' );',
			output: 'var foo = require( \'./foo.js\' );',
			filename: testFileName,
			errors: [ 'Incorrect file path in require(): use ./foo.js instead' ]
		},
		{
			code: 'var foo = require( \'../foo\' );',
			output: 'var foo = require( \'../foo.js\' );',
			filename: path.resolve( __dirname + '/sandbox/nested/test.js' ),
			errors: [ 'Incorrect file path in require(): use ../foo.js instead' ]
		},
		{
			code: 'var foo = require( \'foo.js\' );',
			output: 'var foo = require( \'./foo.js\' );',
			filename: testFileName,
			errors: [ 'Incorrect file path in require(): use ./foo.js instead' ]
		},
		{
			code: 'var foo = require( \'./quux\' );',
			output: 'var foo = require( \'./quux.json\' );',
			filename: testFileName,
			errors: [ 'Incorrect file path in require(): use ./quux.json instead' ]
		},
		{
			code: 'var foo = require( \'quux.json\' );',
			output: 'var foo = require( \'./quux.json\' );',
			filename: testFileName,
			errors: [ 'Incorrect file path in require(): use ./quux.json instead' ]
		}
	]
} );
