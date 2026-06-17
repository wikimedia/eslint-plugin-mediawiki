'use strict';

const fs = require( 'fs' );
const path = require( 'upath' );
const { ESLint } = require( 'eslint' );

const REPO_ROOT = path.resolve( __dirname, '..', '..' );
const PLUGIN = require( path.join( REPO_ROOT, 'src', 'index.js' ) );

function readJSON( file ) {
	return JSON.parse( fs.readFileSync( file, 'utf8' ) );
}

function readHarnessOptions( fixtureDir ) {
	const harnessPath = path.join( fixtureDir, 'harness.json' );
	return fs.existsSync( harnessPath ) ? readJSON( harnessPath ) : {};
}

function makeEslint( fixtureDir, opts = {} ) {
	return new ESLint( Object.assign( {
		cwd: fixtureDir,
		useEslintrc: true,
		ignore: false,
		extensions: [ '.js', '.vue' ],
		plugins: {
			mediawiki: PLUGIN
		}
	}, opts ) );
}

function normalize( results, baseDir, ruleIdFilter ) {
	const filterRegex = ruleIdFilter ? new RegExp( ruleIdFilter ) : null;
	const items = results.map( ( r ) => {
		const rel = path.normalize( path.relative( baseDir, r.filePath ) );
		const messages = r.messages
			.filter( ( m ) => !filterRegex || ( m.ruleId && filterRegex.test( m.ruleId ) ) )
			.map( ( m ) => ( {
				ruleId: m.ruleId,
				severity: m.severity,
				line: m.line
			} ) )
			.sort( ( a, b ) => a.line - b.line || ( a.ruleId || '' ).localeCompare( b.ruleId || '' ) );
		return { rel, messages };
	} );
	items.sort( ( a, b ) => a.rel.localeCompare( b.rel ) );
	const out = {};
	for ( const item of items ) {
		out[ item.rel ] = item.messages;
	}
	return out;
}

async function runFixture( fixtureDir ) {
	const harness = readHarnessOptions( fixtureDir );
	const eslint = makeEslint( fixtureDir );
	const results = await eslint.lintFiles( harness.files || [ 'src' ] );
	return normalize( results, fixtureDir, harness.ruleIdFilter );
}

async function runAutofix( fixtureDir ) {
	const beforeDir = path.join( fixtureDir, 'before' );
	const eslint = makeEslint( fixtureDir, { fix: true } );
	const results = await eslint.lintFiles( [ 'before' ] );
	const out = {};
	for ( const r of results ) {
		const rel = path.normalize( path.relative( beforeDir, r.filePath ) );
		out[ rel ] = r.output !== undefined ?
			r.output :
			fs.readFileSync( r.filePath, 'utf8' );
	}
	return out;
}

function readDirRecursive( dir ) {
	const out = {};
	const walk = ( current, prefix ) => {
		for ( const entry of fs.readdirSync( current, { withFileTypes: true } ) ) {
			const rel = prefix ? `${ prefix }/${ entry.name }` : entry.name;
			const abs = path.join( current, entry.name );
			if ( entry.isDirectory() ) {
				walk( abs, rel );
			} else {
				out[ path.normalize( rel ) ] = fs.readFileSync( abs, 'utf8' );
			}
		}
	};
	walk( dir, '' );
	return out;
}

module.exports = {
	runFixture,
	runAutofix,
	readDirRecursive
};
