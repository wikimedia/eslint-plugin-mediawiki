[//]: # (This file is generated by eslint-docgen. Do not edit it directly.)

# no-nodelist-unsupported-methods

Prohibits [NodeList methods](https://developer.mozilla.org/en-US/docs/Web/API/NodeList#browser_compatibility) not supported by Chrome<51, Firefox<50, Safari<10, IE & others

📋 This rule is enabled in `plugin:mediawiki/common`.

## Rule details

❌ Examples of **incorrect** code:
```js
element.childNodes.forEach();
element.childNodes.entries();
element.childNodes.keys();
element.childNodes.values();
document.querySelectorAll( '.foo' ).forEach();
```

✔️ Examples of **correct** code:
```js
Array.prototype.forEach.call( element.childNodes, function ( element ) {} );
[].forEach();
[].property.forEach();
[].method().forEach();
element.childNodes.item( 1 );
document.querySelectorAll( '.foo' ).item( 1 );
forEach();
```

## Resources

* [Rule source](/src/rules/no-nodelist-unsupported-methods.js)
* [Test source](/tests/rules/no-nodelist-unsupported-methods.js)
