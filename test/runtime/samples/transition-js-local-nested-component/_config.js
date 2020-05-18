export default {
	props: {
		x: false,
	},

	test({ assert, component, target, raf }) {
		component.x = true;

		const div = target.querySelector('div');
		assert.equal(div.foo, undefined);
		raf.tick(1);
		assert.equal(Math.round(div.foo * 100) / 100, 0.01);

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
