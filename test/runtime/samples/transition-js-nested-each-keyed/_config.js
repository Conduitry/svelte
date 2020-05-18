export default {
	props: {
		x: false,
		things: ['a'],
	},

	test({ assert, component, target, window, raf }) {
		component.x = true;

		const div = target.querySelector('div');
		assert.equal(div.foo, undefined);

		raf.tick(100);
		assert.equal(div.foo, 1);

		component.x = false;
		assert.htmlEqual(target.innerHTML, '<div></div>');

		raf.tick(150);
		assert.equal(div.foo, 0.5);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	},
};
