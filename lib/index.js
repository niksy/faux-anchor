var $ = require('jquery');
var Ctor = require('./constructor');
var meta = require('./meta');
var isPublicMethod = require('./is-public-method')(meta.publicMethods);

/**
 * @param  {Mixed} options
 *
 * @return {Object}
 */
function constructOptions ( options ) {

	var temp = {};
	if ( typeof(options) === 'object' ) {
		/**
		 * Provide aliases to "basic" and "alternative" methods
		 */
		if ( options.primary ) {
			temp.basic = options.primary;
		}
		if ( options.secondary ) {
			temp.alternative = options.secondary;
		}
		temp = $.extend({}, options, temp);
	}
	return temp;
}

/**
 * @param  {Object|String} options
 *
 * @return {jQuery}
 */
var plugin = $.fn[meta.name] = module.exports = function ( options ) {

	options = options || {};

	return this.each(function () {

		var instance = $.data(this, meta.name);

		if ( isPublicMethod(options) && instance ) {
			instance[options]();
		} else if ( typeof(options) === 'object' && !instance ) {
			$.data(this, meta.name, new Ctor(this, constructOptions(options)));
		}

	});

};
plugin.defaults = Ctor.prototype.defaults;
