'use strict';

function countListItems( sourceCode, node, countedLines, onlyBefore ) {
	const comments = ( onlyBefore ? [] : sourceCode.getCommentsInside( node ) )
		.concat( sourceCode.getCommentsBefore( node ) );
	return comments.reduce(
		( acc, line ) => {
			if ( line.type === 'Block' ) {
				return acc;
			}
			let matches;
			if ( !countedLines.has( line.value ) ) {
				matches = line.value.match( /^ *\* ?[a-z]./gi );
				countedLines.add( line.value );
			}
			return acc + ( matches ? matches.length : 0 );
		}, 0
	);
}

function isOfLiterals( node ) {
	switch ( node.type ) {
		case 'Literal':
			// Literals: 'foo'
			return true;
		case 'ConditionalExpression':
			// Ternaries: cond ? 'foo' : 'bar'
			return isOfLiterals( node.consequent ) && isOfLiterals( node.alternate );
		case 'ArrayExpression':
			// Arrays of literals
			return node.elements.every( isOfLiterals );
	}
	return false;
}

function containsStringConcatenation( node ) {
	if ( node.type === 'BinaryExpression' && node.operator === '+' ) {
		return true;
	}

	if ( node.type === 'AssignmentExpression' && node.operator === '+=' ) {
		return true;
	}

	// Traverse tree
	for ( const key of Object.keys( node ) ) {
		if ( key === 'parent' ) {
			// Descend only
			continue;
		}
		const value = node[ key ];
		if ( Array.isArray( value ) ) {
			for ( const child of value ) {
				if ( child && typeof child === 'object' && containsStringConcatenation( child ) ) {
					return true;
				}
			}
		} else if ( value && typeof value === 'object' && typeof value.type === 'string' ) {
			if ( containsStringConcatenation( value ) ) {
				return true;
			}
		}
	}

	return false;
}

function requiresCommentList( context, node ) {
	if ( isOfLiterals( node ) ) {
		return false;
	}

	// Most expressions don't contain string concatenation, so
	// only warn if we see explicit inline concatenation.
	if ( !containsStringConcatenation( node ) ) {
		return false;
	}

	const sourceCode = getSourceCode( context );
	// Don't modify `node` so the correct error source is highlighted
	let checkNode = node,
		prevNode = node,
		listItems = 0;
	const countedLines = new Set();
	while (
		checkNode &&
		checkNode.type !== 'ExpressionStatement' &&
		checkNode.type !== 'VariableDeclaration'
	) {
		listItems += countListItems( sourceCode, checkNode, countedLines );

		if ( listItems > 1 ) {
			// Comments found, return
			return false;
		}

		// Allow documentation to be on or in parent nodes
		prevNode = checkNode;
		checkNode = checkNode.parent;
	}

	// In custom parsers (e.g. eslint-plugin-json-es) we can reach the top
	// of the tree. If this happens, don't report any errors.
	// https://github.com/wikimedia/eslint-plugin-mediawiki/issues/59
	if ( !checkNode ) {
		return false;
	}

	// Allow documentation for the first VariableDeclarator in a VariableDeclaration to be
	// above the VariableDeclaration. But don't look inside the VariableDeclaration, because that
	// would allow the documentation for a different variable to be counted.
	if ( checkNode.type === 'VariableDeclaration' && checkNode.declarations[ 0 ] === prevNode ) {
		listItems += countListItems( sourceCode, checkNode, countedLines, true );
		if ( listItems > 1 ) {
			return false;
		}
	}

	return true;
}

/**
 * Get the SourceCode object for a rule context
 *
 * context.getSourceCode() is deprecated in ESLint 9 and removed in ESLint 10.
 * context.sourceCode was added in ESLint 8.40.
 *
 * @param {Object} context Rule context
 * @return {Object} SourceCode
 */
function getSourceCode( context ) {
	/* c8 ignore start -- fallback for ESLint < 8.40 */
	return context.sourceCode || context.getSourceCode();
	/* c8 ignore stop */
}

/**
 * Get the filename for a rule context
 *
 * context.getFilename() is deprecated in ESLint 9 and removed in ESLint 10.
 * context.filename was added in ESLint 8.40.
 *
 * @param {Object} context Rule context
 * @return {string} Filename
 */
function getFilename( context ) {
	/* c8 ignore start -- fallback for ESLint < 8.40 */
	return context.filename !== undefined ? context.filename : context.getFilename();
	/* c8 ignore stop */
}

module.exports = {
	requiresCommentList: requiresCommentList,
	getSourceCode: getSourceCode,
	getFilename: getFilename
};
