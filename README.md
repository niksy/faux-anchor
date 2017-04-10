# faux-anchor

[![Build Status][ci-img]][ci] [![BrowserStack Status][browserstack-img]][browserstack]

Improve anchor and non-anchor elements with primary and secondary actions and callbacks.

When run on anchor elements, it "hijacks" standard action and gives you option of running some operation (e.g. logging some statistics, sending analytics data, executing long AJAX request, …) before primary or while secondary action is performed.

When run on non-anchor elements like buttons or standard tag elements, it tries to apply same heuristics like on anchor elements (e.g. middle mouse button click, return key, combination with meta modifier key, …) to provide (nearly) same behavior. Note that not all actions can be perfomed similarly due to nature of different [browser][caveat-1] [behavior][caveat-2].

## Install

```sh
npm install faux-anchor --save
```

## Usage

Default structure for faux anchor.

```html
<a class="jackie" href="http://example.com" target="_blank">jackie</li>

<div class="lexie" data-href="http://example.com" data-target="_blank">lexie</div>
```

```js
const fauxanchor = require('faux-anchor');
const anchorElement = document.querySelector('.jackie');
const tagElement = document.querySelector('.lexie');

const anchorInstance = fauxanchor(anchorElement, {
	onPrimaryAction: ( e, cb ) => {
		// Called on primary action (e.g. left mouse button click)
		
		// Example: Log some stats…
		statsLogger(() => {
			
			// After it’s done, callback is called to proceed with native/simulated behavior
			cb();
		});

	},
	onSecondaryAction: () => {
		// Called on secondary action (e.g. middle mouse button click)
		
		// You can return Promise which proceeds with native/simulated behavior if it resolves
		return statsLoggerAsPromise;
	}
});

const tagInstance = fauxanchor(tagElement);
```

## API

### fauxanchor(element[, options])

Returns: `Object`

When run on anchor elements, `href` and `target` attributes are used. When run on non-anchor elements, `data-href` and `data-target` attributes are used.

There is also support for `rel`/`data-rel` attribute, particularly [`noopener` value due to security issues][noopener-security].

#### element

Type: `Element`

Element on which to apply changes.

#### options

Type: `Object`

##### onPrimaryAction

Type: `Function`

Callback for primary action (e.g. left mouse button click). This is usually action triggered in the same window.

You can either return Promise or call second function argument to proceed with native/simulated behavior.

Function arguments:

* **e** `Event` Event which triggered callback
* **cb** `Function` Callback to proceed with native/simulated behavior.

##### onSecondaryAction

Type: `Function`

Callback for secondary action (e.g. middle mouse button click). For anchor elements this is usually new window opened via browser native heuristics, and for non-anchor elements `window.open` is used where possible.

You can either return Promise or call second function argument to proceed with native/simulated behavior.

Function arguments:

* **e** `Event` Event which triggered callback
* **cb** `Function` Callback to proceed with native/simulated behavior.

##### focusUnfocusable

Type: `Boolean`  
Default: `true`

Should the unfocusable element (e.g. generic tag) be focusable.

##### elementClass

Type: `String`  
Default: `kist-FauxAnchor`

### instance.destroy()

Destroy instance.

## Test

For local automated tests, run `npm run test:automated:local`.

For manual tests, run `npm run test:manual:local` and open <http://localhost:9000/> in your browser.

## Browser support

Tested in IE9+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/faux-anchor
[ci-img]: https://travis-ci.org/niksy/faux-anchor.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=Nk52TFM4VlNzVXZZNVN4cjBYQ0Q2UlVaMm11a0hjbDdsVkt4a0E1RkpVdz0tLTgrVXIrSmpoeUhiSGtHSmFGa1BCTUE9PQ==--ba8dced5c271a7d8a4fa1e1e396b5e24eed9005d
[caveat-1]: http://stackoverflow.com/questions/15210634/popup-windows-being-blocked-if-opened-through-mousedown-event
[caveat-2]: http://stackoverflow.com/questions/22151676/how-to-prevent-a-keypress-event-firing-a-click-event-when-focus-is-on-a-butt
[noopener-security]: https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c
