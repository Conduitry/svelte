export default {
	props: {
		visible: false,
		things: ['a', 'b', 'c', 'd'],
	},

	// intro: true,

	html: `
		<p>waiting...</p>
	`,

	test({ assert, component, target, raf }) {
		component.visible = true;

		raf.tick(1);
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>introstart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`
		);

		raf.tick(50);

		assert.deepEqual(component.intros.map((v) => v.trim()).sort(), ['a', 'b', 'c', 'd']);
		assert.equal(component.intro_count, 4);

		raf.tick(100);
		assert.equal(component.intro_count, 0);

		assert.htmlEqual(
			target.innerHTML,
			`
			<p>introend</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`
		);

		component.visible = false;
		raf.tick(101);
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>outrostart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`
		);

		raf.tick(150);
		assert.deepEqual(component.outros.map((v) => v.trim()).sort(), ['a', 'b', 'c', 'd']);
		assert.equal(component.outro_count, 4);

		raf.tick(200);
		assert.equal(component.outro_count, 0);

		component.visible = true;

		raf.tick(250);
		assert.deepEqual(component.intros.map((v) => v.trim()).sort(), ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd']);
		assert.equal(component.intro_count, 4);

		assert.htmlEqual(
			target.innerHTML,
			`
			<p>introstart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`
		);
	},
};
