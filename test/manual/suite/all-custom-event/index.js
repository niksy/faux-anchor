'use strict';

var $ = require('jquery');
require('../../../../index');

function isOriginalElement ( original, target ) {
	return original.is(target);
}

$('.anchor').fauxAnchor({
	basic: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	},
	alternative: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
		done();
	}
});

$('.basic').fauxAnchor({
	basic: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	},
	alternative: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	}
});

$('.button').fauxAnchor({
	basic: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	},
	alternative: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	}
});

$('.basic-unfocusable').fauxAnchor({
	focus: false,
	basic: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	},
	alternative: function ( e, done ) {
		console.log(isOriginalElement($(this), $(e.target)));
	}
});
