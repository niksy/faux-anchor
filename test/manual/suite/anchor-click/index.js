'use strict';

var $ = require('jquery');
require('../../../../index');

function result ( data ) {
	console.log(data);
}

$('.link').on('click', function ( e ) {
	e.preventDefault();
	result(e.which);
});
