'use strict';

const rule = require( '../rules/msg-doc' );
const RuleTester = require( 'eslint' ).RuleTester;

const error = 'All possible message keys should be documented';

const ruleTester = new RuleTester();
ruleTester.run( 'msg-doc', rule, {
	valid: [
		'// The following messages are used here:\n' +
		'// * msg:foo-baz\n' +
		'// * msg:foo-quux\n' +
		'display( mw.msg("foo-" + bar), baz )',

		'// The following messages are used here:\n' +
		'// * msg:foo-baz\n' +
		'// * msg:foo-quux\n' +
		'// * msg:foo-whee\n' +
		'message = mw.msg("foo-" + bar)',

		'$foo\n' +
		'// The following messages are used here:\n' +
		'// * msg:foo-baz\n' +
		'// * msg:foo-quux\n' +
		'.text(mw.msg("foo-" + bar))',

		'message = mw.msg(test ? "foo" : "bar")',

		'message = mw.msg("foo-bar")',

		'message = mw.message("foo-bar").plain()',

		'message = OO.ui.deferMsg("foo-bar")',

		'message = ve.msg("foo-bar")',

		'message = mw.msg()'
	],
	invalid: [
		'message = mw.msg( "foo-" + bar )',

		// Not enough messages
		'// This can produce:\n' +
		'// * msg:foo-bar-baz\n' +
		'message = mw.msg( "foo-" + bar )',

		// Wrong format
		'// This constructs foo-baz or foo-quux\n' +
		'message = mw.msg( "foo-" + bar )'
	].map( function ( code ) {
		return {
			code: code,
			errors: [ { message: error, type: 'CallExpression' } ]
		};
	} )
} );
