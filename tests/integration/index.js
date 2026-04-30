'use strict';

const fs = require( 'fs' );
const path = require( 'upath' );
const assert = require( 'assert' );
const { runFixture, runAutofix, readDirRecursive } = require( './helpers' );

const FIXTURES_DIR = path.join( __dirname, 'fixtures' );

const fixtures = fs.readdirSync( FIXTURES_DIR ).filter(
	( name ) => fs.statSync( path.join( FIXTURES_DIR, name ) ).isDirectory()
).sort();

describe( 'integration: rules fire as expected against fixture projects', function () {
	// Loading wikimedia config + parsing .vue files takes a few seconds on slower CI.
	this.timeout( 20000 );

	console.log( 'Running integration test suites against real-ish code samples' );

	fixtures.forEach( ( name ) => {
		const fixtureDir = path.join( FIXTURES_DIR, name );
		const isAutofix = name.startsWith( 'autofix-' );

		it( name, async () => {
			if ( isAutofix ) {
				const actual = await runAutofix( fixtureDir );
				const expected = readDirRecursive( path.join( fixtureDir, 'after' ) );
				assert.deepStrictEqual( actual, expected );
			} else {
				const actual = await runFixture( fixtureDir );
				const expected = JSON.parse( fs.readFileSync(
					path.join( fixtureDir, 'expected.json' ), 'utf8'
				) );
				assert.deepStrictEqual( actual, expected );
			}
		} );
	} );
} );
