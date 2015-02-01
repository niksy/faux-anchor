var htmlClasses = require('./html-classes');

/**
 * @param  {jQuery} el
 * @param  {Object} e
 * @param  {String} type
 */
module.exports = function ( el, e, type ) {

	/**
	 * Stop propagation if:
	 *   * element is not anchor
	 *   * element has faux anchor as parent
	 *   * event propagation is not already stopped
	 */
	if (
		type !== 'anchor' &&
		el.parents('.' + htmlClasses.item).length &&
		!e.isPropagationStopped()
	) {
		e.stopPropagation();
	}

};
