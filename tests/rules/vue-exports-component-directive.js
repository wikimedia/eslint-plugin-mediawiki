'use strict';

const rule = require( '../../src/rules/vue-exports-component-directive' );
const path = require( 'path' );
const RuleTester = require( 'eslint-docgen' ).RuleTester;

const errorMessage = 'The `// @vue/component` directive should be included on the line before module.exports';

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
		// Correctly using the directive
		{ code: makeVueFileContent( '// @vue/component\nmodule.exports = {};' ), filename: vueFileName },
		// Not a Vue file
		{ code: 'module.exports = {};', filename: jsFileName },
		// Vue file but not setting module.exports
		{ code: makeVueFileContent( 'module.exports += 5;' ), filename: vueFileName },
		{ code: makeVueFileContent( 'module.imports = {};' ), filename: vueFileName },
		{ code: makeVueFileContent( 'foo.exports = {};' ), filename: vueFileName }
	],

	invalid: [
		// Missing directive
		{ code: makeVueFileContent( 'module.exports = {};' ), filename: vueFileName, errors: [ errorMessage ] }
	]
} );
