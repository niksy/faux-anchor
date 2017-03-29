var env = require('./env');
var abstract = require('./abstract');
var stopPropagation = require('./stop-propagation');

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

	var blink      = env.browser.blink.all;
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
		if ( (ielte8 && touch) || (blink && !touch) ) {
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
