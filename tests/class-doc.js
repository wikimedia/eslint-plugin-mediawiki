'use strict';

const rule = require( '../rules/class-doc' );
const RuleTester = require( 'eslint' ).RuleTester;

const error = 'All possible CSS classes should be documented';

const ruleTester = new RuleTester();
ruleTester.run( 'class-doc', rule, {
	valid: [
		'// The following classes are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'display( $el.addClass("foo-" + bar), baz )',

		'// The following classes are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'// * foo-whee\n' +
		'$el.addClass("foo-" + bar)',

		'$foo\n' +
		'// The following classes are used here:\n' +
		'// * foo-baz\n' +
		'// * foo-quux\n' +
		'.text($el.addClass("foo-" + bar))',

		'$el.addClass(test ? "foo" : "bar")',

		'$el.addClass("foo-bar")',

		'$el.removeClass("foo-bar")',

		'$el.toggleClass("foo-bar")',

		// Undocumented feature of jQuery methods:
		'$el.addClass(["foo", "bar"])',

		'$el.addClass()',

		'new OO.ui.ButtonWidget( { classes: ["foo"] } )',

		'new OO.ui.ButtonWidget( { "classes": ["foo"] } )',

		// Ternary in array
		'new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" : "disabled"] } )',

		// Array in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ["foo", "bar"] : ["baz", "quux"] } )',

		// Ternary in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ( framed ? "ef": "eu" ) : ( framed ? "df" : "du" ) } )',

		'new OO.ui.ButtonWidget( { framed: false } )'

	],
	invalid: (
		[
			'$el.addClass( "foo-" + bar )',

			'$el.addClass( ["foo", bar] )',

			// Not enough classes
			'// This can produce:\n' +
			'// * foo-bar-baz\n' +
			'$el.addClass( "foo-" + bar )',

			// Wrong format
			'// This constructs foo-baz or foo-quux\n' +
			'$el.addClass( "foo-" + bar )',

			// Block comments are ignored as the extra `*`'s are confusing
			'/**\n' +
			' The following classes are used here:\n' +
			' * foo-baz\n' +
			' * foo-quux\n' +
			' */\n' +
			'display( $el.addClass("foo-" + bar), baz )'

		].map( function ( code ) {
			return {
				code: code,
				errors: [ { message: error, type: 'CallExpression' } ]
			};
		} )
	).concat(
		[
			'new OO.ui.ButtonWidget( { classes: ["foo-" + bar] } )',

			'new OO.ui.ButtonWidget( { "classes": ["foo-" + bar] } )',

			'new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" + mode : "disabled"] } )'
		].map( function ( code ) {
			return {
				code: code,
				errors: [ { message: error, type: 'ObjectExpression' } ]
			};
		} )
	)
} );
