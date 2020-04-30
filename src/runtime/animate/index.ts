import { cubicOut } from 'svelte/easing';
import { AnimationConfig } from 'svelte/internal';


interface FlipParams {
	delay: number;
	duration: number | ((len: number) => number);
	easing: (t: number) => number;
}

export function flip(
	node: Element,
	animation: { from: DOMRect; to: DOMRect },
	{ delay = 0, duration = (d: number) => Math.sqrt(d) * 120, easing = cubicOut }: FlipParams
): AnimationConfig {
	const style = getComputedStyle(node).transform;
	const transform = style === 'none' ? '' : style;
	const scaleX = animation.from.width / node.clientWidth;
	const scaleY = animation.from.height / node.clientHeight;

	const dx = (animation.from.left - animation.to.left) / scaleX;
	const dy = (animation.from.top - animation.to.top) / scaleY;

	return {
		delay,
		duration: typeof duration === 'function' ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
		easing,
		css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`,
	};
}
