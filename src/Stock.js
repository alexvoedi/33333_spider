export default class Stock {
	constructor(game) {
		this.game = game

		this.container = document.querySelector('#stock')

		this.addEvents()
	}

	setStack(stack) {
		this.stack = stack

		this.stack.cards.forEach((card) => {
			this.container.appendChild(card.element)
		})
	}

	addEvents() {
		this.container.addEventListener('click', (e) => this.onClick(e))
	}

	onClick(e) {
		for (let i = 0; i <= 9; i++) {
			let card = this.stack.cards.pop()
			this.container.removeChild(card.element)
			document.body.appendChild(card.element)
			card.setStack(this.game.slots[i].openStack)
			this.game.slots[i].openStack.cards.push(card)
			this.game.slots[i].organize()
		}
	}
}
