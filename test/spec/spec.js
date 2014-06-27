$('li').fauxAnchor();

// Set condition upon which links should be activated
$('li').fauxAnchor({
	condition: function ( target ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});

// Destroy
$('li').fauxAnchor('destroy');

// Update element which previously didn’t have data
$('li').fauxAnchor();
$('li').data('href','#foo').fauxAnchor('update');

$('li').fauxAnchor('prevent');
$('li').fauxAnchor('unprevent');
