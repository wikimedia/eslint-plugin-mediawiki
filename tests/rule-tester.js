'use strict';

/**
 * RuleTester for tests written in flat config format (ESLint 9+)
 *
 * ESLint 8's RuleTester uses eslintrc format, so convert tester config and
 * test cases from flat config format when running with ESLint 8.
 */

const { RuleTester } = require( 'eslint-docgen' );
const { Linter } = require( 'eslint' );

const isEslintrc = Linter.version.startsWith( '8.' );

/**
 * Get the path of a parser module, as eslintrc parsers are loaded by path
 *
 * @param {Object} parser Parser module
 * @return {string} Path
 */
function getParserPath( parser ) {
	const parserModule = Object.keys( require.cache )
		.map( ( key ) => require.cache[ key ] )
		.find( ( m ) => m.exports === parser );
	if ( !parserModule ) {
		throw new Error( 'Parsers must be loaded using require()' );
	}
	return parserModule.filename;
}

/**
 * Convert a tester config or test case from flat config to eslintrc format
 *
 * @param {Object|string} config Flat config, or test case
 * @return {Object|string} eslintrc config, or test case
 */
function toEslintrc( config ) {
	if ( typeof config !== 'object' || !config.languageOptions ) {
		return config;
	}
	const eslintrc = Object.assign( {}, config );
	const languageOptions = eslintrc.languageOptions;
	delete eslintrc.languageOptions;

	eslintrc.parserOptions = Object.assign( {}, languageOptions.parserOptions );
	if ( languageOptions.ecmaVersion !== undefined ) {
		eslintrc.parserOptions.ecmaVersion = languageOptions.ecmaVersion;
	}
	if ( languageOptions.sourceType !== undefined ) {
		eslintrc.parserOptions.sourceType = languageOptions.sourceType;
	}
	if ( languageOptions.globals ) {
		eslintrc.globals = languageOptions.globals;
	}
	if ( languageOptions.parser ) {
		eslintrc.parser = getParserPath( languageOptions.parser );
	}
	return eslintrc;
}

class FlatRuleTester extends RuleTester {
	constructor( config ) {
		super( isEslintrc ? toEslintrc( config ) : config );
	}

	run( name, rule, tests ) {
		if ( isEslintrc ) {
			tests = Object.assign( {}, tests, {
				valid: tests.valid.map( toEslintrc ),
				invalid: tests.invalid.map( toEslintrc )
			} );
		}
		return super.run( name, rule, tests );
	}
}

module.exports = FlatRuleTester;
