'use strict';

const index = require( '../src/index' );
const assert = require( 'assert' );
const fs = require( 'fs' );
const { Linter } = require( 'eslint' );

describe( 'index', () => {
	it( 'index.js contains all rules', ( done ) => {
		fs.readdir( './src/rules', ( error, files ) => {
			assert.strictEqual( files.length, Object.keys( index.rules ).length );
			done();
		} );
	} );

	it( 'flat configs match eslintrc configs', () => {
		[ 'common', 'vue' ].forEach( ( name ) => {
			const flatConfig = index.configs[ 'flat/' + name ];
			assert.deepStrictEqual( flatConfig.rules, index.configs[ name ].rules, name );
			assert.strictEqual( flatConfig.plugins.mediawiki, index, name );
		} );
	} );

	it( 'flat/common config can be used with flat config', () => {
		const linter = new Linter( { configType: 'flat' } );
		const messages = linter.verify(
			'document.cookie = "foo=bar";',
			[ index.configs[ 'flat/common' ] ],
			{ filename: 'test.js' }
		);
		assert.deepStrictEqual( messages.map( ( message ) => message.ruleId ), [ 'mediawiki/no-cookie' ] );
	} );
} );
