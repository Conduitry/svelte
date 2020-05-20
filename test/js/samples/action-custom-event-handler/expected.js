/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "svelte/internal";

function create_fragment(ctx) {
	let button;
	let foo_action;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "foo";
		},
		m(target, anchor, remount) {
			insert(target, button, anchor);
			if (remount) dispose();

			dispose = (foo_action = foo.call(null, button, /*foo_function*/ ctx[1])) && "function" === typeof foo_action.destroy
			? foo_action.destroy
			: noop;
		},
		p(ctx, [dirty]) {
			if (foo_action && "function" === typeof foo_action.update && dirty & /*bar*/ 1) foo_action.update.call(null, /*foo_function*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			dispose();
		}
	};
}

function handleFoo(bar) {
	console.log(bar);
}

function foo(node, callback) {
	
} // code goes here

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;
	const foo_function = () => handleFoo(bar);

	$$self.$set = $$props => {
		if ("bar" in $$props) $$invalidate(0, bar = $$props.bar);
		0;
	};

	return [bar, foo_function];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { bar: 0 });
	}
}

export default Component;