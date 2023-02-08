'use strict';

const utils = require( '../utils.js' );

// TODO: Support `new mw.Message( store, key )` syntax
const methodNames = [ 'msg', 'message', 'deferMsg', '$i18n' ];
// Links to https://www.mediawiki.org/wiki/Special:MyLanguage/Help:System_message#Using_messages
const message = 'All possible message keys should be documented. See https://w.wiki/4r9a for details.';

module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Ensures message keys are documented when they are constructed.'
		},
		schema: []
	},

	create: function ( context ) {

		return {
			'CallExpression[callee.type="MemberExpression"]': function ( node ) {
				if (
					methodNames.includes( node.callee.property.name ) &&
					node.arguments.length &&
					utils.requiresCommentList( context, node.arguments[ 0 ] )
				) {
					context.report( {
						node: node,
						message: message
					} );
				}
			},
			'NewExpression[callee.type="MemberExpression"]': function ( node ) {
				if (
					node.callee.object.name === 'mw' &&
					node.callee.property.name === 'Message' &&
					utils.requiresCommentList( context, node.arguments[ 0 ] )
				) {
					context.report( {
						node: node,
						message: message
					} );
				}

			}
		};
	}
};
