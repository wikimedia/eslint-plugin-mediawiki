'use strict';

const path = require( 'upath' );

const fileExtensions = new Set( [ '.js', '.vue' ] );
const allowedBaseNames = new Set( [ 'index', 'index.test' ] );
const titleCasePattern = /^[A-Z][A-Za-z0-9]*$/;
const titleCaseDotTestPattern = /^[A-Z][A-Za-z0-9]*\.test$/;

function isValidBaseName( baseName ) {
	return allowedBaseNames.has( baseName ) ||
		titleCasePattern.test( baseName ) ||
		titleCaseDotTestPattern.test( baseName );
}

module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Require TitleCase file names for JavaScript and Vue files, with optional .test suffix.',
			recommended: false
		},
		schema: [],
		messages: {
			notTitleCase: 'Filename "{{filename}}" should be TitleCase (for example, FooBar.js or FooBar.test.js).'
		}
	},

	create( context ) {
		const fileName = context.getFilename();
		if ( fileName === '<input>' || fileName === '<text>' ) {
			return {};
		}

		const parsedPath = path.parse( fileName );
		const fileExtension = parsedPath.ext.toLowerCase();
		const baseName = parsedPath.name;

		if (
			!fileExtensions.has( fileExtension ) ||
			baseName.startsWith( '.' ) ||
			isValidBaseName( baseName )
		) {
			return {};
		}

		return {
			Program( node ) {
				context.report( {
					node,
					messageId: 'notTitleCase',
					data: {
						filename: parsedPath.base
					}
				} );
			}
		};
	}
};
