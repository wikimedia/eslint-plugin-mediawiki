'use strict';

const storageNames = [ 'localStorage', 'sessionStorage' ];

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow direct access to localStorage and sessionStorage. Use mw.storage or mw.storage.session instead.',
			recommended: true
		},
		schema: [],
		messages: {
			noStorage: 'Avoid direct access to {{name}}. Use {{replacement}} instead.'
		}
	},
	create( context ) {
		return {
			MemberExpression( node ) {
				if ( node.object.type !== 'Identifier' ) {
					return;
				}
				// Direct global access: localStorage/sessionStorage
				if ( storageNames.includes( node.object.name ) ) {
					// Check if localStorage/sessionStorage is shadowed by a local variable
					const scope = context.getSourceCode().getScope( node.object );
					const isShadowed = scope.variables.some( ( v ) => v.name === node.object.name );
					if ( !isShadowed ) {
						context.report( {
							node: node.object,
							messageId: 'noStorage',
							data: {
								name: node.object.name,
								replacement: node.object.name === 'sessionStorage' ? 'mw.storage.session' : 'mw.storage'
							}
						} );
					}
				}
				if (
					node.object.name === 'window' &&
					// window.localStorage or window.sessionStorage
					( node.property.type === 'Identifier' && storageNames.includes( node.property.name ) ) ||
					// window['localStorage'] or window['sessionStorage']
					( node.property.type === 'Literal' && storageNames.includes( node.property.value ) )
				) {
					const name = node.property.name || node.property.value;
					context.report( {
						node: node.property,
						messageId: 'noStorage',
						data: {
							name,
							replacement: name === 'sessionStorage' ? 'mw.storage.session' : 'mw.storage'
						}
					} );
				}
			}
		};
	}
};
