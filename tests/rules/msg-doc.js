'use strict';

const rule = require( '../../src/rules/msg-doc' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;
const outdent = require( 'outdent' );

const error = 'All possible message keys should be documented. See https://w.wiki/4r9a for details.';

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

		// The comment for the first variable declaration may be inside the var statement...
		outdent`
		function foo() {
			var
				// This can produce:
				// * foo-x
				// * foo-y
				first = mw.msg( 'foo-' + baz ),
				// This can produce:
				// * bar-x
				// * bar-y
				second = mw.msg( 'bar-' + baz );
		}`,

		// ...or above the var statement
		outdent`
		function foo() {
			// This can produce:
			// * foo-x
			// * foo-y
			var first = mw.msg( 'foo-' + baz ),
				// This can produce:
				// * bar-x
				// * bar-y
				second = mw.msg( 'bar-' + baz );
		}`,

		outdent`
		// This can produce:
		// * foo-x
		// * foo-y
		new mw.Message( 'foo-' + baz)
		`,

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
		'message = new mw.Message( cond ? "baz" : "foo-" + bar )',

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
		display( mw.msg("foo-" + bar), baz )`,

		// A comment for the second variable does not count for the first variable
		outdent`
		function foo() {
			var first = mw.msg( 'foo-' + baz ),
				// This can produce:
				// * bar-x
				// * bar-y
				second = mw.msg( 'bar-' + baz );
		}`,

		// A comment for the first variable does not count for the second variable
		outdent`
		function foo() {
			var
				// This can produce:
				// * foo-x
				// * foo-y
				first = mw.msg( 'foo-' + baz ),
				second = mw.msg( 'bar-' + baz );
		}`,

		// A comment above the var statement only counts for the first variable, not the second
		outdent`
		function foo() {
			// This can produce:
			// * foo-x
			// * foo-y
			var first = mw.msg( 'foo-' + baz ),
				second = mw.msg( 'bar-' + baz );
		}`,

		// A comment elsewhere in the function does not count for a variable declaration
		outdent`
		function foo() {
			var first = mw.msg( 'foo-' + baz ), second;
			bar.quux();
			// This can produce:
			// * bar-x
			// * bar-y
			second = mw.msg( 'bar-' + baz );
		}`

	].map( function ( code ) {
		return {
			code: code,
			errors: [ error ]
		};
	} )
} );
