;(function ( $, window, document, undefined ) {

	var plugin = {
		name: 'fauxAnchor',
		ns: {
			css: 'kist-FauxAnchor',
			event: '.kist.fauxAnchor'
		},
		error: function ( message ) {
			throw new Error(plugin.name + ': ' + message);
		}
	};
	plugin.classes = {
		item: plugin.ns.css + '-item'
	};
	plugin.publicMethods = ['destroy','prevent','unprevent'];

	var dom = {
		setup: function () {
			this.dom    = this.dom || {};
			this.dom.el = $(this.element);

			this.dom.el.addClass(plugin.classes.item);

			// Make unfocusable elements focusable
			if ( this.options.type === 'unfocusable' && this.options.focus ) {
				this.dom.el.attr('tabindex', 0);
			}
		},
		destroy: function () {
			this.dom.el.removeClass(plugin.classes.item);

			if ( this.options.type === 'unfocusable' && this.options.focus ) {
				this.dom.el.removeAttr('tabindex');
			}
		}
	};

	var events = {
		setup: function () {

			this.dom.el.on('click' + this.instance.ens, $.proxy(entryAction, this));
			this.dom.el.on('mousedown' + this.instance.ens, $.proxy(entryAction, this));
			this.dom.el.on('keydown' + this.instance.ens, $.proxy(entryAction, this));

		},
		destroy: function () {
			this.dom.el.off(this.instance.ens);
		}
	};

	var instance = {
		id: 0,
		setup: function () {
			this.instance     = this.instance || {};
			this.instance.id  = instance.id++;
			this.instance.ens = plugin.ns.event + '.' + this.instance.id;
		},
		destroy: function () {
			delete $.data(this.element)[plugin.name];
		}
	};

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

		var webkit  = env.browser.webkit.all;
		var safari  = env.browser.safari.all;
		var ielte8  = env.browser.ie.lte8;
		var touch   = env.feature.touch;
		var type    = this.options.type;
		var metaKey = env.input.metaKey(e);
		var state   = 0;

		if ( event === 'click' ) {
			if ( (!webkit && !touch) || (ielte8 && touch) ) {
				state++;
			}
		}

		if ( event === 'mousedown' ) {
			if ( webkit || touch && key !== 2 ) {
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

	/**
	 * @param  {Object} e
	 *
	 * @return {}
	 */
	function entryAction ( e ) {

		var key   = e.which;
		var event = e.type;
		var type  = this.options.type;

		if ( type === 'anchor' && event === 'click' ) {
			e.preventDefault();
		}

		if ( stopEntryAction.call(this, event, key, e) ) {
			return;
		}

		this.simulateAlternative = abstract.simulateAlternative.call(this, type, e);

		this.action(
			abstract.href.call(this, type),
			abstract.target.call(this, type, e),
			e.target
		);

	}

	/**
	 * Detecting environments to normalize actions
	 * Ugly, but works… sort of
	 * @hattip http://browserhacks.com/
	 */
	var env = {
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
				lte8: document.all && !document.addEventListener
			}
		},
		feature: {

			// @hattip https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
			touch: (('Modernizr' in window) && Modernizr.touchevents) || (('ontouchstart' in window) || ('DocumentTouch' in window) && document instanceof DocumentTouch)
		},
		input: {
			metaKey: function ( e ) {
				return ((e.ctrlKey && !env.platform.osx) || e.metaKey);
			}
		}
	};

	var abstract = {

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
			return this.dom.el[type === 'anchor' ? 'attr' : 'data']('target') || '';

		},

		/**
		 * Determine URL
		 *
		 * @param  {String} type
		 *
		 * @return {String}
		 */
		href: function ( type ) {
			return this.dom.el[type === 'anchor' ? 'attr' : 'data']('href') || '';
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
				 *   * middle mouse button AND is not WebKit browser OR
				 *   * left mouse button AND ⌃ AND is IE <= 8
				 */
				if ( (e.which === 2 && !env.browser.webkit.all) ||
					(e.which === 1 && e.ctrlKey && env.browser.ie.lte8)
				) {
					return false;
				}
			}
			return true;
		}
	};

	function FauxAnchor ( element, options ) {

		this.element = element;
		this.options = $.extend({}, this.defaults, { type: abstract.type(this.element) }, options);

		instance.setup.call(this);
		dom.setup.call(this);
		events.setup.call(this);

	}

	$.extend(FauxAnchor.prototype, {

		/**
		 * Run on element click
		 *
		 * @param  {String} url
		 * @param  {String} target
		 * @param  {Element} trueTarget
		 *
		 * @return {}
		 */
		action: function ( url, target, trueTarget ) {

			var type = target === '_blank' ? 'alternative' : 'basic';
			var domEl = this.dom.el[0];

			/**
			 * Exit early if:
			 *   * current or closest element to clicked one is real anchor
			 *     and if current element is not anchor
			 *   * condition returns false
			 *   * location is not provided
			 */
			if (
				( this.options.type !== 'anchor' && $(trueTarget).closest('a').length ) ||
				!this.options.condition.call(domEl, domEl) ||
				!url
			) {
				return;
			}

			return this.options[type].call(domEl, $.proxy(this[type], this, url), domEl);

		},

		/**
		 * Basic action
		 *
		 * @param  {String} url
		 *
		 * @return {}
		 */
		basic: function ( url ) {
			window.location.assign(url);
		},

		/**
		 * Alternative action
		 *
		 * @param  {String} url
		 *
		 * @return {}
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
			 * Should the unfocusable element be focusable
			 *
			 * @type {Boolean}
			 */
			focus: true,

			/**
			 * Basic action
			 *
			 * @this {FauxAnchor#dom.el[0]}
			 * @param  {Function} done
			 * @param  {Element} el
			 *
			 * @return {}
			 */
			basic: function ( done, el ) {
				done();
			},

			/**
			 * ALternative action
			 *
			 * @this {FauxAnchor#dom.el[0]}
			 * @param  {Function} done
			 * @param  {Element} el
			 *
			 * @return {}
			 */
			alternative: function ( done, el ) {
				done();
			},

			/**
			 * @this {FauxAnchor#dom.el[0]}
			 * @param  {Element} el
			 *
			 * @return {Boolean}
			 */
			condition: function ( el ) {
				return true;
			}

		}

	});

	/**
	 * @param  {Object} options
	 *
	 * @return {Object}
	 */
	function constructOptions ( options ) {

		var temp = {};

		/**
		 * Provide aliases to "basic" and "alternative"
		 */
		if ( options.primary ) {
			temp.basic = options.primary;
		}
		if ( options.secondary ) {
			temp.alternative = options.secondary;
		}

		return $.extend({}, options, temp);

	}

	$.kist = $.kist || {};

	$.fn[plugin.name] = function ( options ) {

		if ( typeof(options) === 'string' && $.inArray(options, plugin.publicMethods) !== -1 ) {
			return this.each(function () {
				var pluginInstance = $.data(this, plugin.name);
				if ( pluginInstance ) {
					pluginInstance[options]();
				}
			});
		}

		options = constructOptions(options);

		return this.each(function () {
			if (!$.data(this, plugin.name)) {
				$.data(this, plugin.name, new FauxAnchor( this, options ));
			}
		});

	};

})( jQuery, window, document );
