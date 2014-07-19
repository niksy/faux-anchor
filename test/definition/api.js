$('li').fauxAnchor();

// Set condition upon which links should be activated
$('li').fauxAnchor({
	condition: function ( el ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});

// Define custom basic and alternative action
$('li').fauxAnchor({
	basic: function ( el, done ) {

	},
	alternative: function ( el, done ) {

	}
});

// Destroy
$('li').fauxAnchor('destroy');

// Prevent/unprevent actions
$('li').fauxAnchor('prevent');
$('li').fauxAnchor('unprevent');
