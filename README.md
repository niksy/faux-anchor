# kist-fauxAnchor

Simulate anchors on non-anchor elements.

## Installation

```sh
bower install niksy/kist-fauxAnchor
```

## API

### `Element.fauxAnchor([options])`

Returns: `jQuery`

Picks up necessary data from data attributes on element: `href` for URL and `target` for window name.

#### options

Type: `Object|String`

##### Options defined as `Object`

###### condition

Type: `Function`  
Returns: ( [Currently clicked element] )

If function returns true, link will be activated.

##### Options defined as `String`

Type: `String`

###### destroy

Destroy plugin instance.

###### update

Update plugin instance with new data (e.g. previously updated `data` object).

## Examples

Default structure for faux anchor.

```html
<li data-href="http://example.com" data-target="_blank">
	Some content
</li>
```

Run on list item.

```js
$('li').fauxAnchor();
```

Set condition upon which links should be activated.

```js
$('li').fauxAnchor({
	condition: function ( target ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});
```

Update element which previously didn’t have data

```js
$('li').fauxAnchor();
$('li').data('href','#foo').fauxAnchor('update');
```

Destroy plugin instance.

```js
$('li').fauxAnchor('destroy');
```

## Browser support

Tested in IE8+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
