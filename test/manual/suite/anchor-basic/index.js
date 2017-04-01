'use strict';

var $ = require('jquery');
require('../../../../index');

$('.first').fauxAnchor();

$('.second').fauxAnchor();

$('.third').fauxAnchor({
	condition: () => {
		return window.matchMedia('screen and (max-width:900px)').matches;
	}
});

$('.fourth').fauxAnchor();

$('.fifth').fauxAnchor({
	basic: function ( e, done ) {
		console.log('Basic action');
	},
	alternative: function ( e, done ) {
		console.log('Alternative action');
	}
});

$('.sixth').fauxAnchor({
	anchorPreventDefault: false
});

$('.updateSecond').on('click', function ( e ) {
	$('.second').attr('href', '#foo');
});

$('.triggerFirst').on('click', function ( e ) {
	$('.first').trigger('click');
});

$('.destroyAll').on('click', function ( e ) {
	$('li').fauxAnchor('destroy');
});

$('.preventFirst').on('click', function ( e ) {
	$('.first').fauxAnchor('prevent');
});

$('.preventFirstSecond').on('click', function ( e ) {
	$('.first, .second').fauxAnchor('prevent');
});

$('.unpreventFirst').on('click', function ( e ) {
	$('.first').fauxAnchor('unprevent');
});

$('.unpreventSecond').on('click', function ( e ) {
	$('.second').fauxAnchor('unprevent');
});
