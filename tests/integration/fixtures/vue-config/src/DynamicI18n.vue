<template>
	<div>{{ $i18n( msgKey ) }}</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
module.exports = defineComponent( {
	data() {
		return { msgKey: 'foo' };
	}
} );
</script>
