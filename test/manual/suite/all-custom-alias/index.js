'use strict';

var $ = require('jquery');
require('../../../../index');

$('.anchor').fauxAnchor({
	primary: function ( e, done ) {
		console.log('Basic action');
	},
	secondary: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic').fauxAnchor({
	primary: function ( e, done ) {
		console.log('Basic action');
	},
	secondary: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.button').fauxAnchor({
	primary: function ( e, done ) {
		console.log('Basic action');
	},
	secondary: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic-unfocusable').fauxAnchor({
	focus: false,
	primary: function ( e, done ) {
		console.log('Basic action');
	},
	secondary: function ( e, done ) {
		console.log('Alternative action');
	}
});
