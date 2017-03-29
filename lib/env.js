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
		blink: {
			all: !!window.chrome
		},
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
