'use strict';

const rule = require( '../src/rules/msg-doc' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;
const outdent = require( 'outdent' );

const error = 'All possible message keys should be documented. See https://w.wiki/PRw for details.';

const ruleTester = new RuleTester();
ruleTester.run( 'msg-doc', rule, {
	valid: [
		outdent`
		// The following messages are used here:
		// * foo-baz
		// * foo-quux
		display( mw.msg("foo-" + bar), baz )`,

		outdent`
		// The following messages are used here:
		// * foo-baz
		// * foo-quux
		// * foo-whee
		message = mw.msg("foo-" + bar)`,

		outdent`
		$foo
			// The following messages are used here:
			// * foo-baz
			// * foo-quux
			.text(mw.msg("foo-" + bar))`,

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
		outdent`
		// This can produce:
		// * foo-bar-baz
		message = mw.msg( "foo-" + bar )`,

		// Not enough messages (duplicate)
		outdent`
		// This can produce:
		// * foo-bar-baz
		// * foo-bar-baz
		message = mw.msg( "foo-" + bar )`,

		// Wrong format
		outdent`
		// This constructs foo-baz or foo-quux
		message = mw.msg( "foo-" + bar )`,

		// Block comments are ignored as the extra *'s are confusing
		outdent`
		/**
		 The following messages are used here:
		 * foo-baz
		 * foo-quux
		 */
		display( mw.msg("foo-" + bar), baz )`

	].map( function ( code ) {
		return {
			code: code,
			errors: [ error ]
		};
	} )
} );
