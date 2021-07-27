# vue-exports-component-directive

Complains about vue files where the `module.exports =` declaration is not preceded by a comment `// @vue/component`. This comment is used to trigger eslint-plugin-vue rules to run.

## Rule details

❌ Example of **incorrect** code:
```vue
<template>
	<p>Placeholder</p>
</template>
<script>
module.exports = {
	name: 'Placeholder'
};
</script>
```

✔️ Example of **correct** code:
```vue
<template>
	<p>Placeholder</p>
</template>
<script>
// @vue/component
module.exports = {
	name: 'Placeholder'
};
</script>
```

## Resources

* [Rule source](/src/rules/vue-exports-component-directive.js)
* [Test source](/tests/rules/vue-exports-component-directive.js)
