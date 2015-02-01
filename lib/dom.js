// jscs:disable disallowQuotedKeysInObjects

var $ = require('jquery');
var contextMenu = require('./contextmenu');
var htmlClasses = require('./html-classes');

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
