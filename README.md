# kist-fauxAnchor

Simulate default anchor action.

When run on anchor elements, it "hijacks" standard action and gives you option of running some operation (e.g. logging some statistics, sending analytics data, executing long AJAX request, etc.) before basic action or in conjuction with alternative action.

## Installation

```sh
bower install niksy/kist-fauxAnchor
```

## API

### `Element.fauxAnchor([options])`

Returns: `jQuery`

Picks up necessary data from data attributes on element: `href` for URL and `target` for window name when run on non-anchor elements, or standard `href` and `target` attributes when run on standard anchor elements.

#### options

Type: `Object|String`

##### Options defined as `Object`

All methods have their `this` property pointed to element on which the plugin was initiated.

###### basic

Type: `Function`  
Arguments: [Default action], [Element]

Custom action to trigger on basic action (default click, left mouse button click, etc.).

###### alternative

Type: `Function`  
Arguments: [Alternative action], [Element]

Custom action to trigger on alternative action (⌃ or ⌘ + left mouse button click, middle mouse button click, etc.).

###### condition

Type: `Function`  
Arguments: [Element]

If function returns true, link will be activated.

###### focus

Type: `Boolean`  

Should the unfocusable element be focusable.

##### Options defined as `String`

Type: `String`

###### destroy

Destroy plugin instance.

###### prevent

Prevent plugin instance from activating actions.

###### unprevent

Unprevent plugin instance actions prevention.

## Examples

Default structure for faux anchor.

```html
<li data-href="http://example.com" data-target="_blank">Some content</li>

<a href="http://example.com" target="_blank">Some content</li>
```

Run on list item.

```js
$('li').fauxAnchor();
```

Run on standard anchor.

```js
$('a').fauxAnchor();
```

Set custom actions.

```js
$('.element').fauxAnchor({
	basic: function ( done, el ) {
		// Do something
		$(this).addClass('foo');
		done();
	},
	alternative: function ( done, el ) {
		// Do something
		$(this).addClass('bar');
		done();
	}
});
```

Set condition upon which links should be activated.

```js
$('.element').fauxAnchor({
	condition: function ( el ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});
```

Set option which determines should the unfocusable element be focusable.

```js
$('.element').fauxAnchor({
	focus: true
});
```

Prevent plugin instance action.

```js
$('.element').fauxAnchor('prevent');
```

Unprevent plugin instance action.

```js
$('.element').fauxAnchor('unprevent');
```

Destroy plugin instance.

```js
$('.element').fauxAnchor('destroy');
```

## Browser support

Tested in IE8+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
