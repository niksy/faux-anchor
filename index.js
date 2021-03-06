import closest from 'dom-closest';
import isPromise from 'is-promise';

const isMacOs = ('navigator' in global) ? /OS X/i.test(navigator.userAgent) : false;

const TARGET_SAME_WINDOW = 1;
const TARGET_NEW_WINDOW = 2;

const TYPE_ANCHOR = 1;
const TYPE_BUTTON = 2;
const TYPE_UNFOCUSABLE = 3;

const FAUX_ANCHOR_ACTIVE_ATTRIBUTE = 'data-faux-anchor';

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isMetaKey ( e ) {
	return ((e.ctrlKey && !isMacOs) || e.metaKey);
}

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isLeftClick ( e ) {
	if (
		e.type === 'click' &&
		e.button === 0 &&
		e.which === 1 &&
		!isMetaKey(e)
	) {
		return true;
	}
	return false;
}

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isReturnClick ( e ) {
	if (
		e.type === 'keyup' &&
		e.which === 13 &&
		!isMetaKey(e)
	) {
		return true;
	}
	return false;
}

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isMiddleClick ( e ) {
	if (
		e.type === 'mouseup' &&
		e.button === 1 &&
		e.which === 2
	) {
		return true;
	}
	return false;
}

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isMetaLeftClick ( e ) {
	if (
		e.type === 'click' &&
		e.button === 0 &&
		e.which === 1 &&
		isMetaKey(e)
	) {
		return true;
	}
	return false;
}

/**
 * @param  {Event}  e
 *
 * @return {Boolean}
 */
function isMetaReturnClick ( e ) {
	if (
		e.type === 'keyup' &&
		e.which === 13 &&
		isMetaKey(e)
	) {
		return true;
	}
	return false;
}

/**
 * @param  {Event} e
 *
 * @return {Promise}
 */
function defaultActionCb ( e ) {
	return Promise.resolve();
}

/**
 * @param  {String} href
 *
 * @return {Object}
 */
function primaryActionHandlerCb ( href ) {
	return window.location.assign(href);
}

class FauxAnchor {

	/**
	 * @param {Element} element
	 * @param {Object} options
	 */
	constructor ( element, options = {} ) {

		const {
			focusUnfocusable = true,
			onPrimaryAction = defaultActionCb,
			onSecondaryAction = defaultActionCb,
			primaryActionHandler = primaryActionHandlerCb
		} = options;

		this.element = element;
		this.options = {
			...this.options,
			focusUnfocusable,
			onPrimaryAction,
			onSecondaryAction,
			primaryActionHandler
		};

		this.type = this.determineType();
		this.href = this.determineHref();
		this.target = this.determineTarget();
		this.rel = this.determineRelations();

		this.setupDom();
		this.setupEvents();

	}

	determineType () {
		if ( this.element instanceof HTMLAnchorElement ) {
			return TYPE_ANCHOR;
		}
		if (
			this.element instanceof HTMLButtonElement ||
			this.element instanceof HTMLInputElement
		) {
			return TYPE_BUTTON;
		}
		return TYPE_UNFOCUSABLE;
	}

	determineHref () {
		if ( this.type === TYPE_ANCHOR ) {
			return this.element.href;
		}
		if ( this.element.dataset && this.element.dataset.href ) {
			return this.element.dataset.href;
		}
		if ( this.element.getAttribute('data-href') !== null ) {
			return this.element.getAttribute('data-href');
		}
		throw new Error('Cannot determine href value for faux anchor.');
	}

	determineTarget ( e ) {

		if ( typeof e !== 'undefined' ) {

			if (
				this.type === TYPE_ANCHOR &&
				(
					isMiddleClick(e) ||
					isMetaLeftClick(e) ||
					isMetaReturnClick(e)
				)
			) {
				return TARGET_NEW_WINDOW;
			}

			if (
				this.type !== TYPE_ANCHOR &&
				(
					isMetaLeftClick(e)
				)
			) {
				return TARGET_NEW_WINDOW;
			}

		}

		let target = '';

		if ( this.type === TYPE_ANCHOR ) {
			target = this.element.target;
		} else if ( this.element.dataset && this.element.dataset.target ) {
			target = this.element.dataset.target;
		} else if ( this.element.getAttribute('data-target') !== null ) {
			target = this.element.getAttribute('data-target');
		}

		if ( target === '_blank' ) {
			return TARGET_NEW_WINDOW;
		}
		return TARGET_SAME_WINDOW;

	}

	determineRelations () {
		if ( this.type === TYPE_ANCHOR ) {
			return this.element.rel;
		}
		if ( this.element.dataset && this.element.dataset.rel ) {
			return this.element.dataset.rel;
		}
		if ( this.element.getAttribute('data-rel') !== null ) {
			return this.element.getAttribute('data-rel');
		}
		return '';
	}

	setupDom () {

		this.element.setAttribute(FAUX_ANCHOR_ACTIVE_ATTRIBUTE, true);

		if ( this.type !== TYPE_ANCHOR ) {
			this.element.setAttribute('role', 'link');
		}

		if ( this.type === TYPE_UNFOCUSABLE && this.options.focusUnfocusable ) {
			this.element.setAttribute('tabindex', 0);
		}

	}

	destroyDom () {

		this.element.removeAttribute(FAUX_ANCHOR_ACTIVE_ATTRIBUTE);

		if ( this.type !== TYPE_ANCHOR ) {
			this.element.removeAttribute('role');
		}

		if ( this.type === TYPE_UNFOCUSABLE && this.options.focusUnfocusable ) {
			this.element.removeAttribute('tabindex');
		}

	}

	setupEvents () {

		this.eventListeners = {
			click: ( e ) => {
				if ( this.shouldStopEventPropagation(e) ) {
					e.stopPropagation();
				}
				if (
					this.type === TYPE_ANCHOR &&
					this.target !== TARGET_NEW_WINDOW &&
					isLeftClick(e)
				) {
					e.preventDefault();
				}
				if (
					isLeftClick(e) ||
					isMetaLeftClick(e)
				) {
					this.triggerAction(e);
				}
			},
			mouseup: ( e ) => {
				if ( this.shouldStopEventPropagation(e) ) {
					e.stopPropagation();
				}
				if (
					isMiddleClick(e)
				) {
					if ( this.type === TYPE_ANCHOR ) {
						this.triggerAction(e);
					} else {
						// Fallback
					}
				}
			},
			keyup: ( e ) => {
				if ( this.shouldStopEventPropagation(e) ) {
					e.stopPropagation();
				}
				if (
					isReturnClick(e) ||
					isMetaReturnClick(e)
				) {
					if ( this.type === TYPE_UNFOCUSABLE ) {
						if (
							this.target !== TARGET_NEW_WINDOW &&
							isReturnClick(e)
						) {
							this.triggerAction(e);
						} else {
							// Fallback
						}
					}
				}
			}
		};

		Object.keys(this.eventListeners)
			.forEach(( ev ) => {
				this.element.addEventListener(ev, this.eventListeners[ev], false);
			});

	}

	destroyEvents () {

		Object.keys(this.eventListeners)
			.forEach(( ev ) => {
				this.element.removeEventListener(ev, this.eventListeners[ev], false);
			});

	}

	/**
	 * @param  {Event} e
	 *
	 * @return {Boolean}
	 */
	shouldTriggerAction ( e ) {

		/**
		 * Don’t trigger action when clicking on anchor
		 * inside non-anchor faux anchor instance
		 */
		if (
			this.type !== TYPE_ANCHOR &&
			closest(e.target, 'a')
		) {
			return false;
		}
		return true;

	}

	/**
	 * @param  {Event} e
	 *
	 * @return {Boolean}
	 */
	shouldStopEventPropagation ( e ) {

		/**
		 * Stop event propagation if instance has non-anchor element and
		 * faux anchor instance as parent(s)
		 */
		if (
			!closest(this.element.parentNode, 'a') &&
			closest(this.element.parentNode, `[${FAUX_ANCHOR_ACTIVE_ATTRIBUTE}]`)
		) {
			return true;
		}
		return false;

	}

	/**
	 * @param  {Event} e
	 */
	triggerAction ( e ) {

		const target = this.determineTarget(e);
		let cb, returnValue;

		if ( !this.shouldTriggerAction(e) ) {
			return;
		}

		if ( target === TARGET_NEW_WINDOW ) {
			if ( this.type !== TYPE_ANCHOR ) {
				this.simulateSecondaryAction();
			}

			cb = () => {};
			returnValue = this.options.onSecondaryAction(e);

		} else {

			cb = () => {
				this.simulatePrimaryAction();
			};
			returnValue = this.options.onPrimaryAction(e);

		}

		if ( isPromise(returnValue) ) {
			returnValue.then(cb);
		}

	}

	simulatePrimaryAction () {
		return this.options.primaryActionHandler(this.href);
	}

	simulateSecondaryAction () {
		const w = window.open(this.href, '_blank');
		if (
			w &&
			this.rel !== '' &&
			/noopener/.test(this.rel)
		) {
			w.opener = null;
		}
		return w;
	}

	destroy () {
		this.destroyDom();
		this.destroyEvents();
	}

}

export default ( element, options ) => {
	const instance = new FauxAnchor(element, options);
	return {
		...(process.env.BABEL_ENV === 'test' && { // eslint-disable-line no-process-env, no-undef
			instance: instance
		}),
		destroy: () => {
			instance.destroy();
		}
	};
};
