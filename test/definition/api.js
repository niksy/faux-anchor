$('li').fauxAnchor();

// Set condition upon which links should be activated
$('li').fauxAnchor({
	condition: function ( el ) {
		return window.matchMedia('screen and (max-width:600px)').matches;
	}
});

// Should the unfocusable element be focusable.
$('li').fauxAnchor({
	focus: true
});

// Define custom basic and alternative action
$('li').fauxAnchor({
	basic: function ( done, el ) {
		// Do something
	},
	alternative: function ( done, el ) {
		// Do something
	}
});

// Destroy
$('li').fauxAnchor('destroy');

// Prevent/unprevent actions
$('li').fauxAnchor('prevent');
$('li').fauxAnchor('unprevent');
