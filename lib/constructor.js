var $ = require('jquery');
var dom = require('./dom');
var events = require('./events');
var instance = require('./instance');
var contextMenu = require('./contextmenu');
var abstract = require('./abstract');
var htmlClasses = require('./html-classes');

/**
 * @class
 *
 * @param {Element} element
 * @param {Object} options
 */
var FauxAnchor = module.exports = function ( element, options ) {

	this.element = element;
	this.options = $.extend(true, {}, this.defaults, {
		type: abstract.type(this.element)
	}, options);

	instance.setup.call(this);
	dom.setup.call(this);
	events.setup.call(this);

	if ( contextMenu.shouldSetup.call(this) ) {
		contextMenu.instance.setup.call(this);
		contextMenu.dom.setup.call(this);
		contextMenu.events.setup.call(this);
	}

};

$.extend(FauxAnchor.prototype, {

	/**
	 * Run on element click
	 *
	 * @param  {String} url
	 * @param  {String} target
	 * @param  {Object} e
	 */
	action: function ( url, target, e ) {

		var type = target === '_blank' ? 'alternative' : 'basic';

		if ( !this.shouldActivateAction(url, e) ) {
			return;
		}

		return this.options[type].call(this.element, e, $.proxy(this[type], this, url));

	},

	/**
	 * @param  {String} url
	 * @param  {Object} e
	 *
	 * @return {Boolean}
	 */
	shouldActivateAction: function ( url, e ) {

		/**
		 * Exit early if:
		 *   * current or closest element to clicked one is real anchor
		 *     and if current element is not anchor
		 *   * condition returns false
		 *   * location is not provided
		 */
		if (
			( this.options.type !== 'anchor' && $(e.target).closest('a').length ) ||
			!this.options.condition.call(this.element, e) ||
			!url
		) {
			return false;
		}
		return true;

	},

	/**
	 * Basic action
	 *
	 * @param  {String} url
	 */
	basic: function ( url ) {
		window.location.assign(url);
	},

	/**
	 * Alternative action
	 *
	 * @param  {String} url
	 */
	alternative: function ( url ) {
		if ( !this.simulateAlternative ) {
			return;
		}
		window.open(url, '_blank');
	},

	destroy: function () {

		dom.destroy.call(this);
		events.destroy.call(this);
		instance.destroy.call(this);

		if ( contextMenu.shouldDestroy.call(this) ) {
			contextMenu.dom.destroy.call(this);
			contextMenu.events.destroy.call(this);
			contextMenu.instance.destroy.call(this);
		}

	},

	prevent: function () {
		this.prevented = true;
	},

	unprevent: function () {
		this.prevented = false;
	},

	prevented: false,
	defaults: {

		/**
		 * Should the unfocusable element have context menu
		 */
		contextMenu: true,

		/**
		 * Should the unfocusable element be focusable
		 */
		focus: true,

		/**
		 * Should anchor default action be prevented
		 */
		anchorPreventDefault: true,

		/**
		 * Basic action
		 *
		 * @this {FauxAnchor#element}
		 * @param  {Object} e
		 * @param  {Function} done
		 */
		basic: function ( e, done ) {
			done();
		},

		/**
		 * ALternative action
		 *
		 * @this {FauxAnchor#element}
		 * @param  {Object} e
		 * @param  {Function} done
		 */
		alternative: function ( e, done ) {
			done();
		},

		/**
		 * @this {FauxAnchor#element}
		 * @param  {Object} e
		 *
		 * @return {Boolean}
		 */
		condition: function ( e ) {
			return true;
		},

		classes: htmlClasses

	}

});
