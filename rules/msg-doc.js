'use strict';

// TODO: Support `new mw.Message( store, key )` syntax
const methodNames = [ 'msg', 'message', 'deferMsg' ];

function countMessages( sourceCode, node, countedLines ) {
	const comments = sourceCode.getCommentsInside( node )
		.concat( sourceCode.getCommentsBefore( node ) );
	return comments.reduce(
		function ( acc, line ) {
			let matches;
			if ( !countedLines.has( line ) ) {
				matches = line.value.match( /msg:./g );
				countedLines.add( line );
			}
			return acc + ( matches ? matches.length : 0 );
		}, 0
	);
}

module.exports = {
	meta: {
		docs: {
			description: 'Ensures message keys are documented when they are constructed.'
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
				const arg = node.arguments[ 0 ];

				// Allow self-documenting message key uses
				if (
					// msg( 'foo' )
					arg.type === 'Literal' ||
					// msg( cond ? 'foo' : 'bar' )
					(
						arg.type === 'ConditionalExpression' &&
						arg.consequent.type === 'Literal' &&
						arg.alternate.type === 'Literal'
					)
					// TODO: Support nested ConditionalExpression's?
				) {
					return;
				}

				const sourceCode = context.getSourceCode();
				// Don't modify `node` so the correct error source is highlighted
				let checkNode = node,
					messages = 0;
				const countedLines = new Set();
				while ( checkNode && checkNode.type !== 'ExpressionStatement' ) {
					messages += countMessages( sourceCode, checkNode, countedLines );

					if ( messages > 1 ) {
						// Comments found, return
						return;
					}

					// Allow documentation to be on or in parent nodes
					checkNode = checkNode.parent;
				}
				context.report( {
					node: node,
					message: 'All possible message keys should be documented'
					// TODO: Link to documentation page
				} );
			}
		};
	}
};
