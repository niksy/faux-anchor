var $ = require('jquery');
var meta = require('./meta');
var instance = 0;

var instanceObj = module.exports = {
	count: 0,
	setup: function () {
		this.uid = instance++;
		this.ens = meta.ns.event + '.' + this.uid;
		instanceObj.count++;
	},
	destroy: function () {
		$.removeData(this.element, meta.name);
		instanceObj.count--;
	}
};
