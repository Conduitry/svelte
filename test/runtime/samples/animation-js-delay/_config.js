export default {
	props: {
		things: [
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
			{ id: 3, name: 'c' },
			{ id: 4, name: 'd' },
			{ id: 5, name: 'e' },
		],
	},

	html: `
		<div>a</div>
		<div>b</div>
		<div>c</div>
		<div>d</div>
		<div>e</div>
	`,

	test({ assert, component, target, window, raf }) {
		let divs = document.querySelectorAll('div');
		divs.forEach((div) => {
			div.getBoundingClientRect = function () {
				const index = [...this.parentNode.children].indexOf(this);
				const top = index * 30;

				return {
					left: 0,
					right: 100,
					top,
					bottom: top + 20,
				};
			};
		});

		component.things = [
			{ id: 5, name: 'e' }, // 0 delay
			{ id: 2, name: 'b' }, // 10 delay
			{ id: 3, name: 'c' }, // 20 delay
			{ id: 4, name: 'd' }, // 30 delay
			{ id: 1, name: 'a' }, // 40 delay
		];

		divs = document.querySelectorAll('div');

		raf.tick(50);
		assert.equal(divs[0].dy, 60);
		assert.equal(divs[4].dy, -108);

		raf.tick(100);
		assert.equal(divs[0].dy, 0);
		assert.equal(divs[4].dy, -48);

		raf.tick(150);
		assert.equal(divs[0].dy, 0);
		assert.equal(divs[4].dy, 0);
	},
};
