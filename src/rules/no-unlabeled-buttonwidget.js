'use strict';

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Warn when a label-less OO.ui.ButtonWidget is created without a label or invisible label.',
			category: 'Accessibility',
			recommended: true
		},
		schema: [],
		messages: {
			noLabel: 'OO.ui.ButtonWidget has no label. Even icon-only buttons should set a label with invisibleLabel set to true.'
		}
	},
	create( context ) {
		return {
			NewExpression( node ) {
				if (
					node.callee.property.type === 'Identifier' &&
					node.callee.property.name === 'ButtonWidget' &&
					node.arguments.length >= 1 &&
					node.arguments[ 0 ].type === 'ObjectExpression'
				) {
					const props = {};
					for ( const prop of node.arguments[ 0 ].properties ) {
						if ( !prop.computed && prop.type === 'Property' ) {
							if ( prop.key.type === 'Literal' ) {
								props[ prop.key.value ] = prop.value;
							} else {
								props[ prop.key.name ] = prop.value;
							}
						}
					}
					const hasLabel = 'label' in props && (
						// Empty label
						props.label.type !== 'Literal' || props.label.value.trim() !== ''
					);
					if (
						!hasLabel
					) {
						context.report( { node, messageId: 'noLabel' } );
					}
				}
			}
		};
	}
};
