# no-vue-dynamic-i18n

Prohibits dynamic i18n message keys in Vue templates

## Rule details

❌ Examples of **incorrect** code:
```js
<template><p>{{ $i18n( msgkey ) }}</p></template>;
<template><p>{{ $i18n( msgkey, param1, param2 ) }}</p></template>;
<template><p>{{ $i18n( foo.msgkey ) }}</p></template>;
<template><p>{{ $i18n( 'foo-' + msgkeySuffix ) }}</p></template>;
<template><p v-i18n-html:[msgKey] /></template>;
<template><p v-i18n-html:[msgKey]="[ param1, param2 ]" /></template>;
<template><p v-i18n-html="$i18n( msgkey )" /></template>;
<template><p v-i18n-html="$i18n( msgkey, param1, param2 )" /></template>;
<template><p v-i18n-html="$i18n( msgkey ).params( [ param1, param2 ] )" /></template>
```

✔️ Examples of **correct** code:
```js
<template><p>{{ $i18n( 'foo' ) }}</p></template>;
<template><p>{{ $i18n( 'foo', param1, param2 ) }}</p></template>;
<template><p>{{ $i18n( 'foo' ).params( [ param1, param2 ] ) }}</p></template>;
<template><p v-i18n-html:message-key /></template>;
<template><p v-i18n-html:message-key="[ param1, param2 ]" /></template>;
<template><p v-i18n-html="msgObj" /></template>;
<template><p v-i18n-html="$i18n( 'foo' )" /></template>;
<template><p v-i18n-html="$i18n( 'foo', param1, param2 )" /></template>;
<template><p v-i18n-html="$i18n( 'foo' ).params( [ param1, param2 ] )" /></template>
```

## Resources

* [Rule source](/src/rules/no-vue-dynamic-i18n.js)
* [Test source](/tests/no-vue-dynamic-i18n.js)
