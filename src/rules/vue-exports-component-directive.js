'use strict';

const path = require( 'upath' );

/**
 * Vue files should wrap their module.exports in `defineComponent()` or use
 * `// @vue/component` so that rules from eslint-plugin-vue are triggered.
 *
 * @author DannyS712
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Require `defineComponent()` calls or `// @vue/component` directives to trigger eslint-plugin-vue rules'
		},
		fixable: 'code',
		schema: [],
		messages: {
			'missing-defineComponent': 'Exported component definitions should be wrapped in `defineComponent()`, or have a `// @vue/component` comment above them.'
		}
	},
	create( context ) {
		// Don't trigger on files that don't end in .vue
		const fileName = context.filename;
		const fileExt = path.extname( fileName );
		if ( fileExt !== '.vue' ) {
			// No rules
			return {};
		}

		// Must be a Vue file, look for `module.exports =`
		return {
			AssignmentExpression: ( node ) => {
				// Early return if its not `module.exports =`
				if ( node.operator !== '=' ||
					node.left.type !== 'MemberExpression' ||
					node.left.object.type !== 'Identifier' ||
					node.left.object.name !== 'module' ||
					node.left.property.type !== 'Identifier' ||
					node.left.property.name !== 'exports'
				) {
					return;
				}

				// Look at what comes after `module.exports =`, skipping over `exports =` if present
				let assignedValue = node.right;
				if ( assignedValue.type === 'AssignmentExpression' &&
					assignedValue.operator === '=' &&
					assignedValue.left.type === 'Identifier' &&
					assignedValue.left.name === 'exports'
				) {
					assignedValue = assignedValue.right;
				}

				// Check if what comes after `module.exports =` is a defineComponent() call
				if (
					assignedValue.type === 'CallExpression' &&
					assignedValue.callee.type === 'Identifier' &&
					assignedValue.callee.name === 'defineComponent'
				) {
					// We have module.exports = defineComponent( ... ) or
					// module.exports = exports = defineComponent( ... ), so no directive comment
					// is needed
					return;
				}

				// Check if there's a // @vue/component comment
				// Get all the comments that match the directive, the same way that
				// eslint-plugin-vue does
				const commentTokens = context.getSourceCode()
					.getAllComments()
					.filter( ( comment ) => /@vue\/component/g.test( comment.value ) );
				// Check for a comment on the correct line, the same way eslint-plugin-vue
				// does to determine if it should run.
				const hasDirectiveComment = commentTokens.some(
					( comment ) => comment.loc.end.line === node.loc.start.line - 1
				);
				// If there is such a comment, everything is fine, and return
				if ( hasDirectiveComment ) {
					return;
				}

				// If the assignedValue is an object literal, this rule is fixable
				if ( assignedValue.type === 'ObjectExpression' ) {
					context.report( {
						node,
						messageId: 'missing-defineComponent',
						*fix( fixer ) {
							// Wrap assignedValue in defineComponent( ... )
							yield fixer.insertTextBefore( assignedValue, 'defineComponent( ' );
							yield fixer.insertTextAfter( assignedValue, ' )' );

							// Check whether the defineComponent variable is already defined
							const scope = context.getSourceCode().getScope( assignedValue );
							if ( !scope.variables.some( ( v ) => v.name === 'defineComponent' ) ) {
								// defineComponent is not defined

								// Check if there is already a line that looks like
								// const { ... } = require( 'vue' );
								// eslint-disable-next-line es-x/no-array-prototype-flat
								const varDefs = scope.variables.flatMap( ( v ) => v.defs );
								const existingVar = varDefs.find( ( d ) =>
									d.node.type === 'VariableDeclarator' &&
									d.node.id.type === 'ObjectPattern' &&
									d.node.init.type === 'CallExpression' &&
									d.node.init.callee.type === 'Identifier' &&
									d.node.init.callee.name === 'require' &&
									d.node.init.arguments.length === 1 &&
									d.node.init.arguments[ 0 ].type === 'Literal' &&
									d.node.init.arguments[ 0 ].value === 'vue'
								);

								if ( existingVar ) {
									// If there is, add defineComponent to it
									const objectPattern = existingVar.node.id;
									const lastVar = objectPattern.properties[
										objectPattern.properties.length - 1
									];
									yield fixer.insertTextAfter( lastVar, ', defineComponent' );
								} else {
									// If there isn't, add a new one at the top
									const firstNode = scope.block.body[ 0 ];
									yield fixer.insertTextBefore( firstNode, "const { defineComponent } = require( 'vue' );\n" );
								}
							}
						}
					} );
				} else {
					// Otherwise, complain but don't make it fixable
					context.report( {
						node,
						messageId: 'missing-defineComponent'
					} );
				}
			}
		};
	}
};
