'use strict';

const rule = require( '../../src/rules/no-nodelist-unsupported-methods' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;
const errorMessage = function ( method ) {
	return `NodeList.${method} not supported by Chrome<51, Firefox<50, Safari<10, IE & others. Use Array.prototype.${method}.call instead.`;
};

const ruleTester = new RuleTester();
ruleTester.run( 'no-nodelist-unsupported-methods', rule, {
	valid: [
		'Array.prototype.forEach.call( element.childNodes, function ( element ) {} )',
		'[].forEach()',
		'[].property.forEach()',
		'[].method().forEach()',
		'element.childNodes.item(1)',
		'document.querySelectorAll(".foo").item(1)',
		'forEach()'
	],
	invalid: [
		{
			code: 'element.childNodes.forEach()',
			errors: [ errorMessage( 'forEach' ) ]
		},
		{
			code: 'element.childNodes.entries()',
			errors: [ errorMessage( 'entries' ) ]
		},
		{
			code: 'element.childNodes.keys()',
			errors: [ errorMessage( 'keys' ) ]
		},
		{
			code: 'element.childNodes.values()',
			errors: [ errorMessage( 'values' ) ]
		},
		{
			code: 'document.querySelectorAll(".foo").forEach()',
			errors: [ errorMessage( 'forEach' ) ]
		}
	]
} );
