var $ = require('jquery');
var contextMenu = require('./contextmenu');
var entryAction = require('./entry-action');

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
