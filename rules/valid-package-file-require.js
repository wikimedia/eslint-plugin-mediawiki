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
				let fullRelativeFilePath;
				try {
					fullRelativeFilePath = getFullRelativeFilePath( requiredFileOrModule, context );
				} catch ( e ) {
					return; // not a file path, probably a RL module. All good!
				}

				if ( requiredFileOrModule !== fullRelativeFilePath ) {
					context.report( { node, messageId: 'badFilePath' } );
				}
			}
		};
	}
};
