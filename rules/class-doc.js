'use strict';

const utils = require( './utils.js' );

// TODO: Support native JS methods:
// * element.classList.add()/remove()
// * element.className =
// * jQuery.attr
const methodNames = [ 'addClass', 'removeClass', 'toggleClass' ];

module.exports = {
	meta: {
		docs: {
			description: 'Ensures CSS classes are documented when they are constructed.'
		},
		schema: []
	},

	create: function ( context ) {

		return {
			CallExpression: function ( node ) {
				if (
					node.callee.type !== 'MemberExpression' ||
					!methodNames.includes( node.callee.property.name ) ||
					!node.arguments.length
				) {
					return;
				}

				if ( utils.requiresCommentList( context, node, true ) ) {
					context.report( {
						node: node,
						message: 'All possible CSS classes should be documented'
						// TODO: Link to documentation page
					} );
				}
			}
		};
	}
};
