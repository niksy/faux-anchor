/*! kist-fauxanchor 0.5.0 - Simulate default anchor action. | Author: Ivan Nikolić <niksy5@gmail.com> (http://ivannikolic.com/), 2015 | License: MIT */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self);var n=f;n=n.jQuery||(n.jQuery={}),n=n.fn||(n.fn={}),n.fauxAnchor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var env = require(6);

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
		/**
		 * Don’t simulate alternative if:
		 *   * is anchor AND
		 *   * anchorPreventDefault is falsy OR
		 *   * middle mouse button AND is not WebKit browser AND is not IE <= 8 OR
		 *   * current element is the same as clicked element AND is IE <= 8 AMD (middle mouse button OR left mouse button AND ⌃)
		 */
		if ( type === 'anchor' ) {
			if ( !this.options.anchorPreventDefault ||
				(e.which === 2 && (!env.browser.webkit.all && !env.browser.ie.lte8)) ||
				(this.$el.is(e.target) && env.browser.ie.lte8 && (e.which === 2 || (e.which === 1 && e.ctrlKey)))
			) {
				return false;
			}
		}
		return true;
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var dom = require(4);
var events = require(7);
var instance = require(10);
var contextMenu = require(3);
var abstract = require(1);
var htmlClasses = require(8);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var meta = require(11);
var instance = require(10);
var env = require(6);
var abstract = require(1);
var htmlClasses = require(8);
var stopPropagation = require(12);

var contextMenu = module.exports = {
	common: {
		dom: $(),
		event: null,
		instance: null
	},
	setup: false,
	passesTest: function () {
		return this.options.contextMenu && this.options.type !== 'anchor' && env.feature.contextMenu;
	},
	shouldSetup: function () {
		return contextMenu.passesTest.call(this) && !contextMenu.setup;
	},
	shouldDestroy: function () {
		return !instance.count && contextMenu.setup;
	},
	instance: {
		setup: function () {
			contextMenu.setup = true;
		},
		destroy: function () {
			contextMenu.setup = false;
			contextMenu.common.instance = null;
		}
	},
	dom: {
		setup: function () {

			var contextMenuItem = htmlClasses.contextMenuItem;
			var menuItems = [
				{
					label: 'Open Link in New Tab',
					'class': contextMenuItem + ' ' + contextMenuItem + '--newTab'
				},
				{
					label: 'Open Link in New Window',
					'class': contextMenuItem + ' ' + contextMenuItem + '--newWindow'
				}
			];

			contextMenu.common.dom = $('<menu />', {
				type: 'context',
				id: htmlClasses.contextMenu
			}).appendTo('body');

			$.each(menuItems, function ( index, item ) {
				contextMenu.common.dom.append($('<menuitem />', item));
			});

		},
		destroy: function () {
			contextMenu.common.dom.remove();
			contextMenu.common.dom = $();
		}
	},
	events: {
		setup: function () {

			contextMenu.common.dom.on('click' + meta.ns.event, '.' + htmlClasses.contextMenuItem,  function ( e ) {

				var _this = contextMenu.common.instance;
				var _e = contextMenu.common.event;

				_this.simulateAlternative = true;

				_this.action(
					abstract.href.call(_this, _this.options.type),
					'_blank',
					_e
				);

			});

		},
		destroy: function () {
			contextMenu.common.dom.off(meta.ns.event);
			contextMenu.common.event = null;
		}
	},

	/**
	 * @param  {Object} e
	 */
	onDisplay: function ( e ) {

		stopPropagation(this.$el, e, this.options.type);

		if ( !this.shouldActivateAction(abstract.href.call(this, this.options.type), e) ) {
			this.$el.removeAttr('contextmenu');
		} else {
			if ( !this.$el.attr('contextmenu') ) {
				this.$el.attr('contextmenu', htmlClasses.contextMenu);
			}
			contextMenu.common.instance = this;
			contextMenu.common.event = e;
		}

	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
// jscs:disable disallowQuotedKeysInObjects

var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var contextMenu = require(3);
var htmlClasses = require(8);

module.exports = {
	setup: function () {
		this.$el = $(this.element);

		this.$el.addClass(htmlClasses.item);

		// Make unfocusable elements focusable
		if ( this.options.type === 'unfocusable' && this.options.focus ) {
			this.$el.attr({
				'tabindex': 0,
				'role': 'link'
			});
		}

		// Setup context menu for non-achor elements
		if ( contextMenu.passesTest.call(this) ) {
			this.$el.attr({
				'contextmenu': htmlClasses.contextMenu
			});
		}

	},
	destroy: function () {
		this.$el.removeClass(htmlClasses.item);

		if ( this.options.type === 'unfocusable' && this.options.focus ) {
			this.$el.removeAttr('tabindex role');
		}

		if ( contextMenu.passesTest.call(this) ) {
			this.$el.removeAttr('contextmenu');
		}
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
var env = require(6);
var abstract = require(1);
var stopPropagation = require(12);

/**
 * Stop executing entry action
 *
 * @param  {String} event
 * @param  {Integer} key
 * @param  {Object} e
 *
 * @return {Boolean}
 */
function stopEntryAction ( event, key, e ) {

	var webkit     = env.browser.webkit.all;
	var safari     = env.browser.safari.all;
	var ielte8     = env.browser.ie.lte8;
	var iemobilewp = env.browser.ie.mobileWP;
	var touch      = env.feature.touch;
	var type       = this.options.type;
	var metaKey    = env.input.metaKey(e);
	var state      = 0;

	if ( event === 'click' ) {
		if ( (!webkit && !touch) || (ielte8 && touch) ) {
			state++;
		}
		if ( iemobilewp ) {
			state--;
		}
	}

	if ( event === 'mousedown' ) {
		if ( webkit || iemobilewp || touch && key !== 2 ) {
			state++;
		}
		if ( ielte8 && touch ) {
			state--;
		}
	}

	if ( event === 'keydown' ) {

		state++;

		if ( !webkit && key === 13 ) {
			state--;
		}

		if ( type === 'anchor' ) {
			if ( !webkit && touch && key === 13 ) {
				state++;
			}
			if ( ielte8 && touch && key === 13 ) {
				state--;
			}
		}

		if ( type === 'button' ) {
			if ( (!webkit && touch && key === 13) || (safari && metaKey) ) {
				state++;
			}
			if ( (webkit && (key === 13 && metaKey)) || (ielte8 && touch && key === 13) ) {
				state--;
			}
		}

		if ( type === 'unfocusable' ) {
			if ( webkit && key === 13 ) {
				state--;
			}
		}

	}

	if ( this.prevented || abstract.contextMenu.call(this, type, e) ) {
		state++;
	}

	return Boolean(Math.max(0, state));
}

module.exports = function ( e ) {

	var key   = e.which;
	var event = e.type;
	var type  = this.options.type;

	if ( type === 'anchor' && event === 'click' && this.options.anchorPreventDefault ) {
		e.preventDefault();
	}

	if ( stopEntryAction.call(this, event, key, e) ) {
		return;
	}

	this.simulateAlternative = abstract.simulateAlternative.call(this, type, e);

	stopPropagation(this.$el, e, type);

	this.action(
		abstract.href.call(this, type),
		abstract.target.call(this, type, e),
		e
	);

};

},{}],6:[function(require,module,exports){
/**
 * Detecting environments to normalize actions
 * Ugly, but works… sort of
 * @hattip http://browserhacks.com/
 */
var env = module.exports = {
	platform: {
		osx: /OS X/i.test(navigator.userAgent)
	},
	browser: {
		webkit: {
			all: 'WebkitAppearance' in document.documentElement.style
		},
		safari: {
			all: /constructor/i.test(window.HTMLElement)
		},
		ff: {
			all: 'MozAppearance' in document.documentElement.style
		},
		ie: {
			lte8: document.all && !document.addEventListener,
			mobileWP: /IEMobile/i.test(navigator.userAgent)
		}
	},
	feature: {
		// @hattip https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
		touch: (('Modernizr' in window) && window.Modernizr.touchevents) || (('ontouchstart' in window) || ('DocumentTouch' in window) && document instanceof window.DocumentTouch),

		// @hattip https://github.com/Modernizr/Modernizr/blob/master/feature-detects/contextmenu.js
		contextMenu: (('Modernizr' in window) && window.Modernizr.contextmenu) || ('contextMenu' in document.documentElement && 'HTMLMenuItemElement' in window)
	},
	input: {
		metaKey: function ( e ) {
			return ((e.ctrlKey && !env.platform.osx) || e.metaKey);
		}
	}
};

},{}],7:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var contextMenu = require(3);
var entryAction = require(5);

module.exports = {
	setup: function () {

		this.$el.on('click' + this.ens, $.proxy(entryAction, this));
		this.$el.on('mousedown' + this.ens, $.proxy(entryAction, this));
		this.$el.on('keydown' + this.ens, $.proxy(entryAction, this));

		if ( contextMenu.passesTest.call(this) ) {
			this.$el.on('contextmenu' + this.ens, $.proxy(contextMenu.onDisplay, this));
		}

	},
	destroy: function () {
		this.$el.off(this.ens);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
var meta = require(11);
var htmlClass = meta.ns.htmlClass;

module.exports = {
	item: htmlClass + '-item',
	contextMenu: htmlClass + '-contextMenu',
	contextMenuItem: htmlClass + '-contextMenu-item'
};

},{}],9:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var Ctor = require(2);
var meta = require(11);
var isPublicMethod = require(13)(meta.publicMethods);

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
var plugin = module.exports = function ( options ) {

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var meta = require(11);
var instance = 0;

var instance = module.exports = {
	count: 0,
	setup: function () {
		this.uid = instance++;
		this.ens = meta.ns.event + '.' + this.uid;
		instance.count++;
	},
	destroy: function () {
		$.removeData(this.element, meta.name);
		instance.count--;
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
module.exports = {
	name: 'fauxAnchor',
	ns: {
		htmlClass: 'kist-FauxAnchor',
		event: '.kist.fauxAnchor'
	},
	publicMethods: ['destroy','prevent','unprevent']
};

},{}],12:[function(require,module,exports){
var htmlClasses = require(8);

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

},{}],13:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

/**
 * @param  {Array} methods
 *
 * @return {Function}
 */
module.exports = function ( methods ) {

	/**
	 * @param  {String} name
	 *
	 * @return {Boolean}
	 */
	return function ( name ) {
		return typeof(name) === 'string' && $.inArray(name, methods || []) !== -1;
	};

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[9])(9)
});