function countListItems( sourceCode, node, countedLines ) {
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

function requiresCommentList( context, node, allowLiteralArray ) {
	const arg = node.arguments[ 0 ];

	// Allow self-documenting values
	if (
		// Literals: 'foo'
		arg.type === 'Literal' ||
		// Ternaries: cond ? 'foo' : 'bar'
		(
			arg.type === 'ConditionalExpression' &&
			arg.consequent.type === 'Literal' &&
			arg.alternate.type === 'Literal'
		)
		// TODO: Support nested ConditionalExpression's?
	) {
		return false;
	}

	if (
		allowLiteralArray &&
		arg.type === 'ArrayExpression'
	) {
		// Arrays of literals: [ 'foo', 'bar' ]
		if ( arg.elements.every( ( node ) => node.type === 'Literal' ) ) {
			return false;
		}
	}

	const sourceCode = context.getSourceCode();
	// Don't modify `node` so the correct error source is highlighted
	let checkNode = node,
		listItems = 0;
	const countedLines = new Set();
	while ( checkNode && checkNode.type !== 'ExpressionStatement' ) {
		listItems += countListItems( sourceCode, checkNode, countedLines );

		if ( listItems > 1 ) {
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
