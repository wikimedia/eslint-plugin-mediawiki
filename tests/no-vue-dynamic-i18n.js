const rule = require( '../rules/no-vue-dynamic-i18n' );
const path = require( 'path' );
const RuleTester = require( 'eslint' ).RuleTester;

const errorMessage = 'Dynamic message keys should not be used in templates. Use a computed property instead.';

const ruleTester = new RuleTester( {
	parser: require.resolve( 'vue-eslint-parser' )
} );
const testFileName = path.resolve( __dirname + '/sandbox/test.vue' );

ruleTester.run( 'no-vue-dynamic-i18n', rule, {
	valid: [
		"<template><p>{{ $i18n( 'foo' ) }}</p></template>",
		"<template><p>{{ $i18n( 'foo', param1, param2 ) }}</p></template>",
		"<template><p>{{ $i18n( 'foo' ).params( [ param1, param2 ] ) }}</p></template>",
		'<template><p v-i18n-html:message-key /></template>',
		'<template><p v-i18n-html:message-key="[ param1, param2 ]" /></template>',
		'<template><p v-i18n-html="msgObj" /></template>',
		"<template><p v-i18n-html=\"$i18n( 'foo' )\" /></template>",
		"<template><p v-i18n-html=\"$i18n( 'foo', param1, param2 )\" /></template>",
		"<template><p v-i18n-html=\"$i18n( 'foo' ).params( [ param1, param2 ] )\" /></template>"
	].map( ( code ) => ( {
		code,
		filename: testFileName
	} ) ),

	invalid: [
		'<template><p>{{ $i18n( msgkey ) }}</p></template>',
		'<template><p>{{ $i18n( msgkey, param1, param2 ) }}</p></template>',
		'<template><p>{{ $i18n( foo.msgkey ) }}</p></template>',
		"<template><p>{{ $i18n( 'foo-' + msgkeySuffix ) }}</p></template>",
		'<template><p v-i18n-html:[msgKey] /></template>',
		'<template><p v-i18n-html:[msgKey]="[ param1, param2 ]" /></template>',
		'<template><p v-i18n-html="$i18n( msgkey )" /></template>',
		'<template><p v-i18n-html="$i18n( msgkey, param1, param2 )" /></template>',
		'<template><p v-i18n-html="$i18n( msgkey ).params( [ param1, param2 ] )" /></template>'
	].map( ( code ) => ( {
		code,
		filename: testFileName,
		errors: [
			{ message: errorMessage }
		]
	} ) )
} );
