var $ = require('jquery');
var meta = require('./meta');
var instance = require('./instance');
var env = require('./env');
var abstract = require('./abstract');
var htmlClasses = require('./html-classes');
var stopPropagation = require('./stop-propagation');

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
