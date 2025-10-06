'use strict';

const rule = require( '../../src/rules/no-unlabeled-buttonwidget' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const ruleTester = new RuleTester( {
	parserOptions: { ecmaVersion: 2019 }
} );
ruleTester.run( 'no-unlabeled-buttonwidget', rule, {
	valid: [
		'widget = new OO.ui.IconWidget( { icon: "edit" } );',
		'widget = new OO.ui.ButtonWidget( { label: "Label" } );',
		{
			code: 'widget = new OO.ui.ButtonWidget( { "label": "Label (literal key)" } );',
			docgen: false
		},
		'widget = new OO.ui.ButtonWidget( { icon: "edit", label: "Label" } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", invisibleLabel: true, label: "Label" } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", invisibleLabel: false, label: "Label" } );',
		// Object method could work if label returns a message, although
		// `label: OO.ui.deferMsg()`` is the normal way to do this.
		'widget = new OO.ui.ButtonWidget( { icon: "edit", label() {} } );'
	],
	invalid: [
		'widget = new OO.ui.ButtonWidget( { icon: "edit" } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", label: "" } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", title: "Title" } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", invisibleLabel: false } );',
		'widget = new OO.ui.ButtonWidget( { icon: "edit", invisibleLabel: true } );',
		'widget = new OO.ui.ButtonWidget( { [ computedProbablyNotLabel ]: "Some value" } );',
		// Ignore spread object even if it's called 'label'. Might not contain a label.
		'widget = new OO.ui.ButtonWidget( { icon: "edit", ...label } );'
	].map( ( code ) => ( {
		code,
		errors: [ { messageId: 'noLabel' } ]
	} ) )
} );
