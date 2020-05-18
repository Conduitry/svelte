export default {
	test({ assert, component, target, raf }) {
		component.visible = true;

		return Promise.resolve().then(() => {
			const div = target.querySelector('div');
			assert.equal(div.foo, undefined);

			raf.tick(50);
			assert.equal(div.foo, 0.5);
		});
	},
};
