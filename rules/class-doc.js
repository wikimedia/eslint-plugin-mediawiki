'use strict';

const utils = require( './utils.js' );

// TODO: Support native JS methods:
// * element.classList.add()/remove()
// * element.className =
// * jQuery.attr
const methodNames = [ 'addClass', 'removeClass', 'toggleClass' ];

const message = 'All possible CSS classes should be documented';

module.exports = {
	meta: {
		docs: {
			description: 'Ensures CSS classes are documented when they are constructed.'
		},
		schema: []
	},

	create: function ( context ) {

		return {
			ObjectExpression: function ( node ) {
				const classesProp = node.properties.find(
					( prop ) => prop.type === 'Property' && (
						(
							prop.key.type === 'Identifier' &&
							prop.key.name === 'classes'
						) ||
						(
							prop.key.type === 'Literal' &&
							prop.key.value === 'classes'
						)
					)
				);
				if ( !classesProp ) {
					return;
				}

				if ( utils.requiresCommentList( context, classesProp.value ) ) {
					context.report( {
						node: node,
						message: message
						// TODO: Link to documentation page
					} );
				}
			},

			CallExpression: function ( node ) {
				if (
					node.callee.type !== 'MemberExpression' ||
					!methodNames.includes( node.callee.property.name ) ||
					!node.arguments.length
				) {
					return;
				}

				if ( utils.requiresCommentList( context, node.arguments[ 0 ] ) ) {
					context.report( {
						node: node,
						message: message
						// TODO: Link to documentation page
					} );
				}
			}
		};
	}
};
