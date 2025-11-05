'use strict';

const rule = require( '../../src/rules/storage-expiry.js' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester();
ruleTester.run( 'storage-expiry', rule, {
	valid: [
		'mw.storage( "key", value )',
		'mw.storage( "key", value, 3600 )',
		'mw.storage( variable, value, 3600 )',
		'mw.storage( variable, value, expiry )',
		'value = mw.storage( "key" )',
		'value = mw.storage( variable )'
	],
	invalid: [
		{
			code: 'mw.storage( variable, value )',
			errors: [ { messageId: 'missingExpiry' } ]
		},
		{
			code: 'mw.storage( variable, value, undefined )',
			errors: [ { messageId: 'missingExpiry' } ]
		}
	]
} );
