# vue-exports-component-directive

Complains about vue files where the `module.exports =` declaration is not preceded by a comment `// @vue/component`. This comment is used to trigger eslint-plugin-vue rules to run.

## Rule details

❌ Examples of **incorrect** code:
```js

<template>
    <p>Placeholder...</p>
</template>
<script>
module.exports = {};
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
// @vue/component

module.exports = {};
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
module.exports = {};
// @vue/component
</script>
```

✔️ Examples of **correct** code:
```js

<template>
    <p>Placeholder...</p>
</template>
<script>
// @vue/component
module.exports = {};
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
/* @vue/component */
module.exports = {};
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
module.exports += 5;
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
module.imports = {};
</script>;

<template>
    <p>Placeholder...</p>
</template>
<script>
foo.exports = {};
</script>
```

## Resources

* [Rule source](/src/rules/vue-exports-component-directive.js)
* [Test source](/tests/rules/vue-exports-component-directive.js)
