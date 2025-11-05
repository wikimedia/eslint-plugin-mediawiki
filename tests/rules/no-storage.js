'use strict';

const rule = require( '../../src/rules/no-storage' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester();
ruleTester.run( 'no-storage', rule, {
	valid: [
		'mw.storage.get( "foo" )',
		'mw.storage.session.get( "bar" )',
		'function foo( localStorage ) { return localStorage.getItem( "foo" ); }'
	],
	invalid: [
		{
			code: 'localStorage.getItem( "foo" )',
			errors: [ { messageId: 'noStorage', data: { name: 'localStorage', replacement: 'mw.storage' } } ]
		},
		{
			code: 'sessionStorage.setItem( "bar", "baz" )',
			errors: [ { messageId: 'noStorage', data: { name: 'sessionStorage', replacement: 'mw.storage.session' } } ]
		},
		{
			code: 'window.localStorage.getItem( "foo" )',
			errors: [ { messageId: 'noStorage', data: { name: 'localStorage', replacement: 'mw.storage' } } ]
		},
		{
			code: 'window.sessionStorage.setItem( "bar", "baz" )',
			errors: [ { messageId: 'noStorage', data: { name: 'sessionStorage', replacement: 'mw.storage.session' } } ]
		},
		{
			code: 'window[ "localStorage" ].getItem( "foo" )',
			errors: [ { messageId: 'noStorage', data: { name: 'localStorage', replacement: 'mw.storage' } } ],
			docgen: false
		},
		{
			code: 'window[ "sessionStorage" ].setItem( "bar", "baz" )',
			errors: [ { messageId: 'noStorage', data: { name: 'sessionStorage', replacement: 'mw.storage.session' } } ],
			docgen: false
		}
	]
} );
