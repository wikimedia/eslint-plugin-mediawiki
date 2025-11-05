'use strict';

const hasPropertyName = ( node, name ) => (
	( node.property.type === 'Identifier' && node.property.name === name ) ||
	( node.property.type === 'Literal' && node.property.value === name )
);

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow direct access to document.cookie. Use mw.cookie instead.',
			recommended: true
		},
		schema: [],
		messages: {
			noCookie: 'Avoid direct access to document.cookie. Use mw.cookie instead.'
		}
	},
	create( context ) {
		return {
			MemberExpression( node ) {
				// document.cookie
				if (
					node.object.type === 'Identifier' &&
					node.object.name === 'document' &&
					hasPropertyName( node, 'cookie' )
				) {
					context.report( {
						node: node.property,
						messageId: 'noCookie'
					} );
				}
				// window.document.cookie
				if (
					node.object.type === 'MemberExpression' &&
					node.object.object.type === 'Identifier' &&
					node.object.object.name === 'window' &&
					hasPropertyName( node.object, 'document' ) &&
					hasPropertyName( node, 'cookie' )
				) {
					context.report( {
						node: node.property,
						messageId: 'noCookie'
					} );
				}
			}
		};
	}
};
