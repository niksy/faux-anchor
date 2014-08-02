$('li').fauxAnchor();

// Set condition upon which links should be activated
$('li').fauxAnchor({
	condition: function ( e ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});

// Should the unfocusable element be focusable.
$('li').fauxAnchor({
	focus: true
});

// Define custom basic and alternative action
$('li').fauxAnchor({
	basic: function ( e, done ) {
		// Do something
	},
	alternative: function ( e, done ) {
		// Do something
	}
});

// Define custom basic and alternative action, aliases
$('li').fauxAnchor({
	primary: function ( e, done ) {
		// Do something
	},
	secondary: function ( e, done ) {
		// Do something
	}
});

// Destroy
$('li').fauxAnchor('destroy');

// Prevent/unprevent actions
$('li').fauxAnchor('prevent');
$('li').fauxAnchor('unprevent');
