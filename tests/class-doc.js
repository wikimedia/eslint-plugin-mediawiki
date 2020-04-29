'use strict';

const rule = require( '../src/rules/class-doc' );
const RuleTester = require( 'eslint' ).RuleTester;

const error = 'All possible CSS classes should be documented';

const ruleTester = new RuleTester( {
	parserOptions: { ecmaVersion: 2019 }
} );
ruleTester.run( 'class-doc', rule, {
	valid: [
		// == jQuery ==
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

		// == DOM:className ==
		'element.className = "foo"',

		'element["className"] = "foo"',

		'element.className = cond ? "foo" : "bar"',

		// == DOM:classList ==
		'element.classList.add("foo", "bar")',

		'element.classList.remove("foo", "bar")',

		'element.classList.replace("foo", "bar")',

		'element.classList.toggle("foo", "bar")',

		// Non-classList "add"
		'object.property.add("foo" + bar)',

		'foo("bar").add("foo" + bar)',

		'add("foo" + bar)',

		// == OOUI ==
		'new OO.ui.ButtonWidget( { classes: ["foo"] } )',

		'new OO.ui.ButtonWidget( { "classes": ["foo"] } )',

		// Ternary in array
		'new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" : "disabled"] } )',

		// Array in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ["foo", "bar"] : ["baz", "quux"] } )',

		// Ternary in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ( framed ? "ef": "eu" ) : ( framed ? "df" : "du" ) } )',

		'new OO.ui.ButtonWidget( { framed: false } )',

		// ES2019 object spread
		'new OO.ui.ButtonWidget( { framed: false, ...config } )'
	],
	invalid: (
		[
			// == jQuery ==
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
			'display( $el.addClass("foo-" + bar), baz )',

			// == DOM:classList ==
			'element.classList.add("foo", "bar" + baz)',

			'element.classList.remove("foo", "bar" + baz)',

			'element.classList.replace("foo", "bar" + baz)',

			'element.classList.toggle("foo", "bar" + baz)'

		].map( function ( code ) {
			return {
				code: code,
				errors: [ { message: error, type: 'CallExpression' } ]
			};
		} )
	).concat(
		[
			// == DOM:className ==
			'element.className = "foo" + bar',

			'element.className = cond ? "foo" : "bar" + baz'
		].map( function ( code ) {
			return {
				code: code,
				errors: [ { message: error, type: 'AssignmentExpression' } ]
			};
		} )
	).concat(
		[
			// == OOUI ==
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
