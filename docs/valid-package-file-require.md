# valid-package-file-require

Ensures `require`d files are in the format that is expected within [ResourceLoader package modules](https://www.mediawiki.org/wiki/ResourceLoader/Package_modules).

## Rule details

❌ The following patterns are considered errors:
```js
var foo = require( './foo' );
var foo = require( '../foo' );
var foo = require( 'foo.js' );
var foo = require( './quux' );
var foo = require( 'quux.json' );
```

✔️ The following patterns are not considered errors:
```js
var foo = require();
var foo = require( './foo.js' );
var foo = require( './quux.json' );
var foo = require( './virtual.json' );
var bar = require( '../valid-package-file-require.js' );
var foo = require( 'foo' );
var bar = require( 'bar' );
var foo = require( '../foo.js' );
var foo = require( './../foo.js' );
```

🔧 The `--fix` option can be used to fix problems reported by this rule:
```js
var foo = require( './foo' );     /* → */ var foo = require( './foo.js' );
var foo = require( '../foo' );    /* → */ var foo = require( '../foo.js' );
var foo = require( 'foo.js' );    /* → */ var foo = require( './foo.js' );
var foo = require( './quux' );    /* → */ var foo = require( './quux.json' );
var foo = require( 'quux.json' ); /* → */ var foo = require( './quux.json' );
```

## Resources

* [Rule source](/src/rules/valid-package-file-require.js)
* [Test source](/tests/valid-package-file-require.js)
