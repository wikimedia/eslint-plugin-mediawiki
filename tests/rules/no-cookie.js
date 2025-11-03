'use strict';

const rule = require( '../../src/rules/no-cookie' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester();
ruleTester.run( 'no-cookie', rule, {
	valid: [
		'mw.cookie.get( "foo" )',
		'mw.cookie.set( "bar", "baz" )',
		'x = cookie'
	],
	invalid: [
		{
			code: 'document.cookie = "foo=bar"',
			errors: [ { messageId: 'noCookie' } ]
		},
		{
			code: 'console.log( document.cookie )',
			errors: [ { messageId: 'noCookie' } ]
		},
		{
			code: 'window.document.cookie = "foo=bar"',
			errors: [ { messageId: 'noCookie' } ]
		},
		{
			code: 'console.log( window.document.cookie )',
			errors: [ { messageId: 'noCookie' } ]
		},
		{
			code: 'document[ "cookie" ] = "foo=bar"',
			errors: [ { messageId: 'noCookie' } ],
			docgen: false
		},
		{
			code: 'window[ "document" ].cookie = "foo=bar"',
			errors: [ { messageId: 'noCookie' } ],
			docgen: false
		},
		{
			code: 'window[ "document" ][ "cookie" ] = "foo=bar"',
			errors: [ { messageId: 'noCookie' } ],
			docgen: false
		}
	]
} );
