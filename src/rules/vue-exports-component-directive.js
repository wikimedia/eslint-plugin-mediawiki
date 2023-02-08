'use strict';

const path = require( 'upath' );

/**
 * Vue files should have `// @vue/component` before their
 * module.exports so that rules from eslint-plugin-vue are
 * triggered.
 *
 * @author DannyS712
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Require `// @vue/component` directives to trigger eslint-plugin-vue rules'
		},
		schema: [],
		messages: {
			'missing-directive': 'The `// @vue/component` directive should be included on the line before module.exports'
		}
	},
	create( context ) {
		// Don't trigger on files that don't end in .vue
		const fileName = context.getFilename();
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

				// Complain about missing directive
				context.report( {
					node,
					messageId: 'missing-directive'
				} );
			}
		};
	}
};
