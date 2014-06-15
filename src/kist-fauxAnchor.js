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
	plugin.publicMethods = ['destroy','update'];

	var dom = {
		setup: function () {
			this.dom    = this.dom || {};
			this.dom.el = $(this.element);

			this.dom.el.addClass(plugin.classes.item);
		},
		destroy: function () {
			this.dom.el.removeClass(plugin.classes.item);
		}
	};

	var events = {
		setup: function () {
			this.dom.el.on('click' + this.instance.ens, $.proxy(function ( e ) {
				this.action(this.data.href, this.data.target, e.target);
			}, this));
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

	function FauxAnchor ( element, options ) {

		this.element = element;
		this.options = $.extend({}, this.defaults, options);

		instance.setup.call(this);
		dom.setup.call(this);
		events.setup.call(this);

		this.update();

	}

	$.extend(FauxAnchor.prototype, {

		/**
		 * Run on element click
		 *
		 * @param  {String} url
		 * @param  {String} target
		 * @param  {Element} eTarget
		 *
		 * @return {}
		 */
		action: function ( url, target, eTarget ) {

			/**
			 * Exit early if:
			 *   * current or closest element to clicked one is real anchor
			 *   * condition returns false
			 *   * location is not provided
			 */
			if (
				$(eTarget).closest('a').length ||
				!this.options.condition.call(null, eTarget) ||
				!url
			) {
				return;
			}

			if ( target ) {
				return window.open(url, target);
			}

			return window.location.assign(url);

		},

		update: function () {
			var data = this.dom.el.data();
			this.data = {
				href: data.href,
				target: data.target
			};
		},

		destroy: function () {
			dom.destroy.call(this);
			events.destroy.call(this);
			instance.destroy.call(this);
		},

		defaults: {

			/**
			 * @param  {Element} target
			 *
			 * @return {Boolean}
			 */
			condition: function ( target ) {
				return true;
			}

		}

	});

	$.fn[plugin.name] = function ( options ) {

		if ( typeof(options) === 'string' && $.inArray(options, plugin.publicMethods) !== -1 ) {
			return this.each(function () {
				var pluginInstance = $.data(this, plugin.name);
				if ( pluginInstance ) {
					pluginInstance[options]();
				}
			});
		}

		return this.each(function () {
			if (!$.data(this, plugin.name)) {
				$.data(this, plugin.name, new FauxAnchor( this, options ));
			}
		});

	};

})( jQuery, window, document );
