'use strict';

const rule = require( '../../src/rules/no-extended-unicode-identifiers' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;
const errorMessage = 'Non-BMP characters are not allowed in identifiers.';

const ruleTester = new RuleTester( {
	// Need to disable no-var, otherwise eslint tries to change var to let, and that then
	// causes a syntax error for some reason
	rules: {
		'no-var': 'off'
	},
	parserOptions: { ecmaVersion: 2019 }
} );
ruleTester.run( 'no-extended-unicode-identifiers', rule, {
	valid: [
		'var x = 42;',
		// U+AB73 CHEROKEE SMALL LETTER O
		'const \u{ab73} = 42;',
		// U+2C82 COPTIC CAPITAL LETTER VIDA
		'let \u{2c82} = 42;'
	],
	invalid: [
		// U+102C0 CARIAN LETTER G
		'var \u{102c0} = 13;',
		// U+20042 CJK UNIFIED IDEOGRAPH-20042
		'const \u{20042} = 13;'
		// Testing with let breaks with a syntax error for some reason
	].map( ( code ) => ( {
		code,
		errors: [ errorMessage ]
	} ) )
} );
