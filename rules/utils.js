function countMessages( sourceCode, node, countedLines ) {
	const comments = sourceCode.getCommentsInside( node )
		.concat( sourceCode.getCommentsBefore( node ) );
	return comments.reduce(
		function ( acc, line ) {
			if ( line.type === 'Block' ) {
				return acc;
			}
			let matches;
			if ( !countedLines.has( line ) ) {
				matches = line.value.match( /^ *\* ?[a-z]./gi );
				countedLines.add( line );
			}
			return acc + ( matches ? matches.length : 0 );
		}, 0
	);
}

function requiresCommentList( context, node ) {
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
		return false;
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
			return false;
		}

		// Allow documentation to be on or in parent nodes
		checkNode = checkNode.parent;
	}

	return true;
}

module.exports = {
	requiresCommentList: requiresCommentList
};
