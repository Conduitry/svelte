export const safe_not_equal = (a, b) =>
	a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';

export const not_equal = (a, b) => (a != a ? b == b : a !== b);
export function get_slot_changes(definition, $$scope, dirty, fn) {
	if (!definition[2] || !fn) return $$scope.dirty;
	const lets = definition[2](fn(dirty));
	if ($$scope.dirty === void 0) return lets;
	else if (typeof lets === 'object') {
		const merged = new Array(Math.max($$scope.dirty.length, lets.length));
		for (let i = 0; i < merged.length; i += 1) merged[i] = $$scope.dirty[i] | lets[i];
		return merged;
	} else return $$scope.dirty | lets;
}
