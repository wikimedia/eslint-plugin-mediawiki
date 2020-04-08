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
	// Allow self-documenting values
	if (
		// Literals: 'foo'
		node.type === 'Literal' ||
		// Ternaries: cond ? 'foo' : 'bar'
		(
			node.type === 'ConditionalExpression' &&
			node.consequent.type === 'Literal' &&
			node.alternate.type === 'Literal'
		)
		// TODO: Support nested ConditionalExpression's?
	) {
		return false;
	}

	if (
		allowLiteralArray &&
		node.type === 'ArrayExpression'
	) {
		// Arrays of literals: [ 'foo', 'bar' ]
		if ( node.elements.every( ( n ) => n.type === 'Literal' ) ) {
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
