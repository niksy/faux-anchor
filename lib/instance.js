var $ = require('jquery');
var meta = require('./meta');
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
