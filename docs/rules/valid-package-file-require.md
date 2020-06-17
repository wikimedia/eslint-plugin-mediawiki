# valid-package-file-require

Ensures `require`d files are in the format that is expected within [ResourceLoader package modules](https://www.mediawiki.org/wiki/ResourceLoader/Package_modules).

🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## Rule details

❌ Examples of **incorrect** code:
```js
var foo = require( './foo' );
var foo = require( '../foo' );
var foo = require( 'foo.js' );
var foo = require( './quux' );
var foo = require( 'quux.json' );
```

✔️ Examples of **correct** code:
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

🔧 Examples of code **fixed** by this rule:
```js
var foo = require( './foo' );     /* → */ var foo = require( './foo.js' );
var foo = require( '../foo' );    /* → */ var foo = require( '../foo.js' );
var foo = require( 'foo.js' );    /* → */ var foo = require( './foo.js' );
var foo = require( './quux' );    /* → */ var foo = require( './quux.json' );
var foo = require( 'quux.json' ); /* → */ var foo = require( './quux.json' );
```

## Resources

* [Rule source](/src/rules/valid-package-file-require.js)
* [Test source](/tests/rules/valid-package-file-require.js)
