'use strict';

const rule = require( '../src/rules/class-doc' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

// Links to https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Coding_conventions/CSS#Constructed_class_names
const error = 'All possible CSS classes should be documented. See https://w.wiki/PS2 for details.';

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
		{
			code: '$el.addClass()',
			noDoc: true
		},

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

		{
			code: 'new OO.ui.ButtonWidget( { "classes": ["foo"] } )',
			noDoc: true
		},

		// Ternary in array
		'new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" : "disabled"] } )',

		// Array in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ["foo", "bar"] : ["baz", "quux"] } )',

		// Ternary in ternary
		'new OO.ui.ButtonWidget( { classes: enabled ? ( framed ? "ef": "eu" ) : ( framed ? "df" : "du" ) } )',

		// No classes
		'new OO.ui.ButtonWidget( { framed: false } )',

		// ES2019 object spread
		{
			code: 'new OO.ui.ButtonWidget( { framed: false, ...config } )',
			noDoc: true
		}
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
			return Object.assign( {
				errors: [ { message: error, type: 'CallExpression' } ]
			}, typeof code === 'string' ? { code: code } : code );
		} )
	).concat(
		[
			// == DOM:className ==
			'element.className = "foo" + bar',
			'element.className = cond ? "foo" : "bar" + baz'
		].map( function ( code ) {
			return Object.assign( {
				errors: [ { message: error, type: 'AssignmentExpression' } ]
			}, typeof code === 'string' ? { code: code } : code );
		} )
	).concat(
		[
			// == OOUI ==
			'new OO.ui.ButtonWidget( { classes: ["foo-" + bar] } )',
			{
				code: 'new OO.ui.ButtonWidget( { "classes": ["foo-" + bar] } )',
				noDoc: true
			},
			'new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" + mode : "disabled"] } )'
		].map( function ( code ) {
			return Object.assign( {
				errors: [ { message: error, type: 'ObjectExpression' } ]
			}, typeof code === 'string' ? { code: code } : code );
		} )
	)
} );
