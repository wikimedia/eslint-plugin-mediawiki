'use strict';

const methods = [ 'forEach', 'entries', 'keys', 'values' ];

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			// Full browser support table: https://developer.mozilla.org/en-US/docs/Web/API/NodeList#browser_compatibility
			description: 'Prohibits [NodeList methods](https://developer.mozilla.org/en-US/docs/Web/API/NodeList#browser_compatibility) not supported by Chrome<51, Firefox<50, Safari<10, IE & others'
		},
		schema: [],
		messages: {
			nodelistMethod: 'NodeList.{{method}} not supported by Chrome<51, Firefox<50, Safari<10, IE & others. Use Array.prototype.{{method}}.call instead.'
		}
	},

	create( context ) {
		return {
			CallExpression( node ) {
				if ( node.callee.type !== 'MemberExpression' ) {
					return;
				}
				const name = node.callee.property.name;
				if ( !methods.includes( name ) ) {
					return;
				}

				if (
					// element.childNodes.forEach
					( node.callee.object.property && node.callee.object.property.name === 'childNodes' ) ||
					// element.querySelectorAll( '' ).forEach
					(
						node.callee.object.callee && node.callee.object.callee.property &&
						node.callee.object.callee.property.name === 'querySelectorAll'
					)
				) {
					context.report( {
						node: node,
						messageId: 'nodelistMethod',
						data: {
							method: name
						}
					} );
				}
			}
		};
	}
};
