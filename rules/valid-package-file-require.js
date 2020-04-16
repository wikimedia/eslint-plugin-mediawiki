const path = require( 'path' );

function dotSlashPrefixIfMissing( fileName ) {
	return fileName.indexOf( '.' ) !== 0 ? `./${fileName}` : fileName;
}

function getFullRelativeFilePath( name, context ) {
	const contextDirPath = path.dirname( context.getFilename() );
	const absolutePath = require.resolve(
		// `require( 'foo.js' )` will be resolved in older node version, whereas for newer ones
		// it should always be `require( './foo.js' )` for files in the same directory.
		// => always prefix with './'
		dotSlashPrefixIfMissing( name ),
		{ paths: [ contextDirPath ] }
	);
	const relativePath = path.relative( contextDirPath, absolutePath );

	return dotSlashPrefixIfMissing( relativePath );
}

module.exports = {
	meta: {
		messages: {
			badFilePath: 'bad resource loader package file path'
		}
	},

	create: function ( context ) {
		return {
			CallExpression: ( node ) => {
				if ( node.callee.name !== 'require' || !node.arguments.length ) {
					return;
				}

				const requiredFileOrModule = node.arguments[ 0 ].value;
				// Check if the argument starts with ./ or ../, or ends with .js or .json
				if ( !requiredFileOrModule.match( /(^\.\.?\/)|(\.(js|json)$)/ ) ) {
					// If not, it's probably a ResourceLoader module; ignore
					return;
				}

				let fullRelativeFilePath;
				try {
					fullRelativeFilePath = getFullRelativeFilePath( requiredFileOrModule, context );
				} catch ( e ) {
					// File doesn't exist, probably a virtual file in a packageFiles module; ignore
					return;
				}

				if ( requiredFileOrModule !== fullRelativeFilePath ) {
					context.report( { node, messageId: 'badFilePath' } );
				}
			}
		};
	}
};
