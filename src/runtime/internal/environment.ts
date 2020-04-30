import { noop } from './utils';

export const is_client = typeof window !== 'undefined';
export const is_iframe = is_client && window.location !== window.parent.location;

export let now = is_client ? window.performance.now : () => Date.now();

export let raf = is_client ? window.requestAnimationFrame : noop;

// used internally for testing
export function set_now(fn) {
	now = fn;
}
export function set_raf(fn) {
	raf = fn;
}
