export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};


export const debounce = (func, wait = 100) => {
	return function (event) {
		if (wait) clearTimeout(wait);
		wait = setTimeout(func, 100, event);
	};
}