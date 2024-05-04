'use strict';

const rule = require( '../../src/rules/vue-exports-component-directive' );
const path = require( 'path' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const errorMessage = 'Exported component definitions should be wrapped in `defineComponent()`, or have a `// @vue/component` comment above them.';

const ruleTester = new RuleTester( {
	parser: require.resolve( 'vue-eslint-parser' )
} );
const vueFileName = path.resolve( __dirname, '../sandbox/test.vue' );
const jsFileName = path.resolve( __dirname, '../sandbox/test.js' );

/**
 * Returns the contents that would be appropriate for an overall
 * .vue file, with the scriptContents being contained between <script></script>
 * tags.
 *
 * @param {string} scriptContents
 * @return {string}
 */
function makeVueFileContent( scriptContents ) {
	const aboveScriptContents = `<template>
	<p>Placeholder...</p>
</template>
<script>`;
	return aboveScriptContents + '\n' + scriptContents + '\n</script>';
}

ruleTester.run( 'vue-exports-component-directive', rule, {
	valid: [
		// Correctly using the directive (both types of comments work)
		{ code: makeVueFileContent( '// @vue/component\nmodule.exports = {};' ), filename: vueFileName },
		{ code: makeVueFileContent( '/* @vue/component */\nmodule.exports = {};' ), filename: vueFileName },
		// Using defineComponent without a directive
		{ code: makeVueFileContent( 'module.exports = defineComponent( {} );' ), filename: vueFileName },
		// Using module.exports = exports = ...
		{ code: makeVueFileContent( '// @vue/component\nmodule.exports = exports = {};' ), filename: vueFileName },
		{ code: makeVueFileContent( 'module.exports = exports = defineComponent( {} );' ), filename: vueFileName },
		// Not a Vue file. Don't show this in the docs because its unclear from the output
		// that its non a Vue file
		{ code: 'module.exports = {};', filename: jsFileName, docgen: false },
		// Vue file but not setting module.exports
		{ code: makeVueFileContent( 'module.exports += 5;' ), filename: vueFileName },
		{ code: makeVueFileContent( 'module.imports = {};' ), filename: vueFileName },
		{ code: makeVueFileContent( 'foo.exports = {};' ), filename: vueFileName }
	],

	invalid: [
		// Missing directive
		{ code: makeVueFileContent( 'module.exports = {};' ), filename: vueFileName, errors: [ errorMessage ] },
		// Directive is on the wrong line (one line too high)
		{ code: makeVueFileContent( '// @vue/component\n\nmodule.exports = {};' ), filename: vueFileName, errors: [ errorMessage ] },
		// Directive is on the wrong line (after the module.exports)
		{ code: makeVueFileContent( 'module.exports = {};\n// @vue/component' ), filename: vueFileName, errors: [ errorMessage ] },
		// Calling a function that is not defineComponent
		{ code: makeVueFileContent( 'module.exports = notDefineComponent( {} );' ), filename: vueFileName, errors: [ errorMessage ] }
	]
} );
