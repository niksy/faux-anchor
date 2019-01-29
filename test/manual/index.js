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
	onPrimaryAction: ( e ) => {
		console.log('heidi, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('heidi, secondary click');
	}
});

fauxAnchor(document.querySelector('.macy'), {
	onPrimaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('macy, primary click');
				resolve();
			}, 1000);
		});
	},
	onSecondaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('macy, secondary click');
				resolve();
			}, 1000);
		});
	}
});

fauxAnchor(document.querySelector('.chloe'), {
	onPrimaryAction: ( e ) => {
		console.log('chloe, primary click');
		return Promise.resolve();
	},
	onSecondaryAction: ( e ) => {
		console.log('chloe, secondary click');
		return Promise.resolve();
	}
});

/**
 * =============================================================================
 * Tag
 * =============================================================================
 */

fauxAnchor(document.querySelector('.lexie'));

fauxAnchor(document.querySelector('.archie'));

fauxAnchor(document.querySelector('.buddy'), {
	onPrimaryAction: ( e ) => {
		console.log('buddy, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('buddy, secondary click');
	}
});

fauxAnchor(document.querySelector('.coco'), {
	onPrimaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('coco, primary click');
				resolve();
			}, 1000);
		});
	},
	onSecondaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('coco, secondary click');
				resolve();
			}, 1000);
		});
	}
});

fauxAnchor(document.querySelector('.spike'), {
	onPrimaryAction: ( e ) => {
		console.log('spike, primary click');
		return Promise.resolve();
	},
	onSecondaryAction: ( e ) => {
		console.log('spike, secondary click');
		return Promise.resolve();
	}
});

/**
 * =============================================================================
 * Button
 * =============================================================================
 */

fauxAnchor(document.querySelector('.gizmo'));

fauxAnchor(document.querySelector('.rex'));

fauxAnchor(document.querySelector('.peanut'), {
	onPrimaryAction: ( e ) => {
		console.log('peanut, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('peanut, secondary click');
	}
});

fauxAnchor(document.querySelector('.ollie'), {
	onPrimaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('ollie, primary click');
				resolve();
			}, 1000);
		});
	},
	onSecondaryAction: ( e ) => {
		return new Promise(( resolve ) => {
			setTimeout(() => {
				console.log('ollie, secondary click');
				resolve();
			}, 1000);
		});
	}
});

fauxAnchor(document.querySelector('.layla'), {
	onPrimaryAction: ( e ) => {
		console.log('layla, primary click');
		return Promise.resolve();
	},
	onSecondaryAction: ( e ) => {
		console.log('layla, secondary click');
		return Promise.resolve();
	}
});


/**
 * =============================================================================
 * Complex cases
 * =============================================================================
 */

fauxAnchor(document.querySelector('.simba'), {
	onPrimaryAction: ( e ) => {
		console.log('simba, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('simba, secondary click');
	}
});

fauxAnchor(document.querySelector('.sammy'), {
	onPrimaryAction: ( e ) => {
		console.log('sammy, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('sammy, secondary click');
	}
});

fauxAnchor(document.querySelector('.piper'), {
	onPrimaryAction: ( e ) => {
		console.log('piper, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('piper, secondary click');
	}
});

fauxAnchor(document.querySelector('.penny'), {
	onPrimaryAction: ( e ) => {
		console.log('penny, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('penny, secondary click');
	}
});

fauxAnchor(document.querySelector('.olive'), {
	onPrimaryAction: ( e ) => {
		console.log('olive, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('olive, secondary click');
	}
});

fauxAnchor(document.querySelector('.moose'), {
	onPrimaryAction: ( e ) => {
		console.log('moose, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('moose, secondary click');
	}
});

fauxAnchor(document.querySelector('.scooter'), {
	onPrimaryAction: ( e ) => {
		console.log('scooter, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('scooter, secondary click');
	}
});

fauxAnchor(document.querySelector('.zoey'), {
	onPrimaryAction: ( e ) => {
		console.log('zoey, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('zoey, secondary click');
	}
});

fauxAnchor(document.querySelector('.annie'), {
	onPrimaryAction: ( e ) => {
		console.log('annie, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('annie, secondary click');
	}
});

fauxAnchor(document.querySelector('.luke'), {
	focusUnfocusable: false,
	onPrimaryAction: ( e ) => {
		console.log('luke, primary click');
	},
	onSecondaryAction: ( e ) => {
		console.log('luke, secondary click');
	}
});
