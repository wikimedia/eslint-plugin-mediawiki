# msg-doc

Ensures message keys are documented when they are constructed.

## Rule details

❌ Examples of **incorrect** code:
```js
message = mw.msg( 'foo-' + bar );
message = mw.msg( cond ? 'baz' : 'foo-' + bar );

// This can produce:
// * foo-bar-baz
message = mw.msg( 'foo-' + bar );

// This can produce:
// * foo-bar-baz
// * foo-bar-baz
message = mw.msg( 'foo-' + bar );

// This constructs foo-baz or foo-quux
message = mw.msg( 'foo-' + bar );

/**
 The following messages are used here:
 * foo-baz
 * foo-quux
 */
display( mw.msg( 'foo-' + bar ), baz );
```

✔️ Examples of **correct** code:
```js

// The following messages are used here:
// * foo-baz
// * foo-quux
display( mw.msg( 'foo-' + bar ), baz );

// The following messages are used here:
// * foo-baz
// * foo-quux
// * foo-whee
message = mw.msg( 'foo-' + bar );

$foo
// The following messages are used here:
// * foo-baz
// * foo-quux
    .text( mw.msg( 'foo-' + bar ) );

message = mw.msg( test ? 'foo' : 'bar' );
message = mw.msg( test ? ( test2 ? 'foo' : 'bar' ) : ( test2 ? 'baz' : 'quux' ) );
message = mw.msg( 'foo-bar' );
message = mw.message( 'foo-bar' ).plain();
message = OO.ui.deferMsg( 'foo-bar' );
message = ve.msg( 'foo-bar' );
message = mw.msg();
```

## Resources

* [Rule source](/src/rules/msg-doc.js)
* [Test source](/tests/msg-doc.js)