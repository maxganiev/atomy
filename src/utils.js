export class Debounce {
	constructor(timeout = 1000) {
		this.timer = null;
		this.timeout = timeout;
	}

	start(/**@type {Function} */ callback) {
		if (this.timer) clearTimeout(this.timer);

		this.timer = setTimeout(() => {
			callback.apply(null, ...arguments);
		}, this.timeout);
	}
}
