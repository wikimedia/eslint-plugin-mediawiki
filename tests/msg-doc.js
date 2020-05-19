'use strict';

const rule = require( '../src/rules/msg-doc' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const error = 'All possible message keys should be documented. See https://w.wiki/PRw for details.';

const ruleTester = new RuleTester();
ruleTester.run( 'msg-doc', rule, {
	valid: [
		'// The following messages are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'display( mw.msg("foo-" + bar), baz )',

		'// The following messages are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'// * foo-whee\n' +
		'message = mw.msg("foo-" + bar)',

		'$foo\n' +
		'// The following messages are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'.text(mw.msg("foo-" + bar))',

		'message = mw.msg(test ? "foo" : "bar")',

		'message = mw.msg(test ? (test2 ? "foo" : "bar") : (test2 ? "baz" : "quux"))',

		'message = mw.msg("foo-bar")',

		'message = mw.message("foo-bar").plain()',

		'message = OO.ui.deferMsg("foo-bar")',

		'message = ve.msg("foo-bar")',

		'message = mw.msg()'
	],
	invalid: [
		'message = mw.msg( "foo-" + bar )',

		'message = mw.msg( cond ? "baz" : "foo-" + bar )',

		// Not enough messages
		'// This can produce:\n' +
		'// * foo-bar-baz\n' +
		'message = mw.msg( "foo-" + bar )',

		// Not enough messages (duplicate)
		'// This can produce:\n' +
		'// * foo-bar-baz\n' +
		'// * foo-bar-baz\n' +
		'message = mw.msg( "foo-" + bar )',

		// Wrong format
		'// This constructs foo-baz or foo-quux\n' +
		'message = mw.msg( "foo-" + bar )',

		// Block comments are ignored as the extra `*`'s are confusing
		'/**\n' +
		' The following messages are used here:\n' +
		' * foo-baz\n' +
		' * foo-quux\n' +
		' */\n' +
		'display( mw.msg("foo-" + bar), baz )'

	].map( function ( code ) {
		return {
			code: code,
			errors: [ { message: error } ]
		};
	} )
} );
