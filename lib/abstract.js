var $ = require('jquery');
var env = require('./env');

module.exports = {

	/**
	 * Determine tag type
	 *
	 * @param  {Element|jQuery} el
	 *
	 * @return {String}
	 */
	type: function ( el ) {
		el = $(el);
		if ( el.is('a') ) {
			return 'anchor';
		} else if ( el.is('button') || el.is('input[type="button"]') ) {
			return 'button';
		}
		return 'unfocusable';
	},

	/**
	 * Determine target type
	 *
	 * @param  {String} type
	 * @param  {Object} e
	 *
	 * @return {String}
	 */
	target: function ( type, e ) {

		/**
		 * Set to external window if:
		 *   * middle mouse button OR
		 *   * ((left mouse button OR ↩ on non-anchor OR ↩ on anchor on non-WebKit browsers) AND
		 *   * ⌃ on non-OS X OR ⌘ on OS X)
		 *
		 */
		if (
			e.which === 2 ||
			( (e.which === 1 || (e.which === 13 && type !== 'anchor') || (e.which === 13 && type === 'anchor' && !env.browser.webkit.all) ) &&
				env.input.metaKey(e)
			)
		) {
			return '_blank';
		}
		return this.$el[type === 'anchor' ? 'attr' : 'data']('target') || '';

	},

	/**
	 * Determine URL
	 *
	 * @param  {String} type
	 *
	 * @return {String}
	 */
	href: function ( type ) {
		return this.$el[type === 'anchor' ? 'attr' : 'data']('href') || '';
	},

	contextMenu: function ( type, e ) {

		/**
		 * Disable basic/alternative action if:
		 *   * right mouse button OR
		 *   * (left mouse button OR ↩) AND ⌃ on OS X
		 */
		if (
			e.which === 3 ||
			( (e.which === 1 || e.which === 13) && ( e.ctrlKey && env.platform.osx ) )
		) {
			return true;
		}
		return false;

	},

	simulateAlternative: function ( type, e ) {
		if ( type === 'anchor' ) {

			/**
			 * Don’t simulate alternative if:
			 *   * is anchor AND
			 *   * middle mouse button AND is not WebKit browser AND is not IE <= 8 OR
			 *   * current element is the same as clicked element AND is IE <= 8 AMD (middle mouse button OR left mouse button AND ⌃)
			 */
			if ( (e.which === 2 && (!env.browser.webkit.all && !env.browser.ie.lte8)) ||
				(this.$el.is(e.target) && env.browser.ie.lte8 && (e.which === 2 || (e.which === 1 && e.ctrlKey)))
			) {
				return false;
			}
		}
		return true;
	}
};
