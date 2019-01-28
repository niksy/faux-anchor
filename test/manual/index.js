/* eslint-disable no-console */

import './index.css';
import fauxAnchor from '../../index';

/**
 * =============================================================================
 * Anchor
 * =============================================================================
 */

fauxAnchor(document.querySelector('.jackie'));

fauxAnchor(document.querySelector('.louie'));

fauxAnchor(document.querySelector('.heidi'), {
	onPrimaryAction: ( e, done ) => {
		console.log('heidi, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('heidi, secondary click');
	}
});

fauxAnchor(document.querySelector('.macy'), {
	onPrimaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('macy, primary click');
			done();
		}, 1000);
	},
	onSecondaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('macy, secondary click');
			done();
		}, 1000);
	}
});

fauxAnchor(document.querySelector('.chloe'), {
	onPrimaryAction: ( e, done ) => {
		console.log('chloe, primary click');
		done();
	},
	onSecondaryAction: ( e, done ) => {
		console.log('chloe, secondary click');
		done();
	}
});

fauxAnchor(document.querySelector('.apollo'), {
	onPrimaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('apollo, primary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		}),
	onSecondaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('apollo, secondary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		})
});

/**
 * =============================================================================
 * Tag
 * =============================================================================
 */

fauxAnchor(document.querySelector('.lexie'));

fauxAnchor(document.querySelector('.archie'));

fauxAnchor(document.querySelector('.buddy'), {
	onPrimaryAction: ( e, done ) => {
		console.log('buddy, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('buddy, secondary click');
	}
});

fauxAnchor(document.querySelector('.coco'), {
	onPrimaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('coco, primary click');
			done();
		}, 1000);
	},
	onSecondaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('coco, secondary click');
			done();
		}, 1000);
	}
});

fauxAnchor(document.querySelector('.spike'), {
	onPrimaryAction: ( e, done ) => {
		console.log('spike, primary click');
		done();
	},
	onSecondaryAction: ( e, done ) => {
		console.log('spike, secondary click');
		done();
	}
});

fauxAnchor(document.querySelector('.pebbles'), {
	onPrimaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('pebbles, primary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		}),
	onSecondaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('pebbles, secondary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		})
});

/**
 * =============================================================================
 * Button
 * =============================================================================
 */

fauxAnchor(document.querySelector('.gizmo'));

fauxAnchor(document.querySelector('.rex'));

fauxAnchor(document.querySelector('.peanut'), {
	onPrimaryAction: ( e, done ) => {
		console.log('peanut, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('peanut, secondary click');
	}
});

fauxAnchor(document.querySelector('.ollie'), {
	onPrimaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('ollie, primary click');
			done();
		}, 1000);
	},
	onSecondaryAction: ( e, done ) => {
		setTimeout(() => {
			console.log('ollie, secondary click');
			done();
		}, 1000);
	}
});

fauxAnchor(document.querySelector('.layla'), {
	onPrimaryAction: ( e, done ) => {
		console.log('layla, primary click');
		done();
	},
	onSecondaryAction: ( e, done ) => {
		console.log('layla, secondary click');
		done();
	}
});

fauxAnchor(document.querySelector('.roscoe'), {
	onPrimaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('roscoe, primary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		}),
	onSecondaryAction: () => new Promise(( resolve ) => {
		setTimeout(() => {
			resolve('roscoe, secondary click');
		}, 1000);
	})
		.then(( message ) => {
			console.log(message);
			return message;
		})
});


/**
 * =============================================================================
 * Complex cases
 * =============================================================================
 */

fauxAnchor(document.querySelector('.simba'), {
	onPrimaryAction: ( e, done ) => {
		console.log('simba, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('simba, secondary click');
	}
});

fauxAnchor(document.querySelector('.sammy'), {
	onPrimaryAction: ( e, done ) => {
		console.log('sammy, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('sammy, secondary click');
	}
});

fauxAnchor(document.querySelector('.piper'), {
	onPrimaryAction: ( e, done ) => {
		console.log('piper, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('piper, secondary click');
	}
});

fauxAnchor(document.querySelector('.penny'), {
	onPrimaryAction: ( e, done ) => {
		console.log('penny, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('penny, secondary click');
	}
});

fauxAnchor(document.querySelector('.olive'), {
	onPrimaryAction: ( e, done ) => {
		console.log('olive, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('olive, secondary click');
	}
});

fauxAnchor(document.querySelector('.moose'), {
	onPrimaryAction: ( e, done ) => {
		console.log('moose, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('moose, secondary click');
	}
});

fauxAnchor(document.querySelector('.scooter'), {
	onPrimaryAction: ( e, done ) => {
		console.log('scooter, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('scooter, secondary click');
	}
});

fauxAnchor(document.querySelector('.zoey'), {
	onPrimaryAction: ( e, done ) => {
		console.log('zoey, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('zoey, secondary click');
	}
});

fauxAnchor(document.querySelector('.annie'), {
	onPrimaryAction: ( e, done ) => {
		console.log('annie, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('annie, secondary click');
	}
});

fauxAnchor(document.querySelector('.luke'), {
	focusUnfocusable: false,
	onPrimaryAction: ( e, done ) => {
		console.log('luke, primary click');
	},
	onSecondaryAction: ( e, done ) => {
		console.log('luke, secondary click');
	}
});
