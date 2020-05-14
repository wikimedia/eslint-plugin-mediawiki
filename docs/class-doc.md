# class-doc

Ensures CSS classes are documented when they are constructed.

## Rule details

❌ The following patterns are considered errors:
```js
$el.addClass( 'foo-' + bar );
$el.addClass( [ 'foo', bar ] );
// This can produce:
// * foo-bar-baz
$el.addClass( 'foo-' + bar );
// This constructs foo-baz or foo-quux
$el.addClass( 'foo-' + bar );
/**
 The following classes are used here:
 * foo-baz
 * foo-quux
 */
display( $el.addClass( 'foo-' + bar ), baz );
element.classList.add( 'foo', 'bar' + baz );
element.classList.remove( 'foo', 'bar' + baz );
element.classList.replace( 'foo', 'bar' + baz );
element.classList.toggle( 'foo', 'bar' + baz );
element.className = 'foo' + bar;
element.className = cond ? 'foo' : 'bar' + baz;
new OO.ui.ButtonWidget( { classes: [ 'foo-' + bar ] } );
new OO.ui.ButtonWidget( { classes: [ 'foo-' + bar ] } );
new OO.ui.ButtonWidget( { classes: [ 'foo', enabled ? 'enabled' + mode : 'disabled' ] } );
```

✔️ The following patterns are not considered errors:
```js
// The following classes are used here:
// * foo-baz
// * foo-quux
display( $el.addClass("foo-" + bar), baz );
// The following classes are used here:
// * foo-baz
// * foo-quux
// * foo-whee
$el.addClass("foo-" + bar);
$foo
// The following classes are used here:
// * foo-baz
// * foo-quux
.text($el.addClass("foo-" + bar));
$el.addClass(test ? "foo" : "bar");
$el.addClass("foo-bar");
$el.removeClass("foo-bar");
$el.toggleClass("foo-bar");
$el.addClass(["foo", "bar"]);
$el.addClass();
element.className = "foo";
element["className"] = "foo";
element.className = cond ? "foo" : "bar";
element.classList.add("foo", "bar");
element.classList.remove("foo", "bar");
element.classList.replace("foo", "bar");
element.classList.toggle("foo", "bar");
object.property.add("foo" + bar);
foo("bar").add("foo" + bar);
add("foo" + bar);
new OO.ui.ButtonWidget( { classes: ["foo"] } );
new OO.ui.ButtonWidget( { "classes": ["foo"] } );
new OO.ui.ButtonWidget( { classes: ["foo", enabled ? "enabled" : "disabled"] } );
new OO.ui.ButtonWidget( { classes: enabled ? ["foo", "bar"] : ["baz", "quux"] } );
new OO.ui.ButtonWidget( { classes: enabled ? ( framed ? "ef": "eu" ) : ( framed ? "df" : "du" ) } );
new OO.ui.ButtonWidget( { framed: false } );
new OO.ui.ButtonWidget( { framed: false, ...config } )
```

## Resources

* [Rule source](/src/rules/class-doc.js)
* [Test source](/tests/class-doc.js)
