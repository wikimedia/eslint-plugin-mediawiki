'use strict';

mw.cookie.get( 'foo' );

var $el = $( '<div>' );
var bar = 'baz';
$el.addClass( 'foo-' + bar );
