'use strict';

var util = require( './util' );
var foo = require( './nested/foo.js' );
var external = require( 'upath' );

module.exports = { util: util, foo: foo, external: external };
