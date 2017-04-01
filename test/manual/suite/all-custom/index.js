'use strict';

var $ = require('jquery');
require('../../../../index');

$('.anchor').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic-link').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic-basic').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action, with basic inside');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action, with basic inside');
	}
});

$('.basic-condition').fauxAnchor({
	condition: function ( e ) {
		if ( 'matchMedia' in window ) {
			return window.matchMedia('screen and (max-width:900px)').matches;
		}
		return true;
	}
});

$('.button').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.basic-unfocusable').fauxAnchor({
	focus: false,
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});
