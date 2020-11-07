export default class Stack {
	constructor(cards = [], type = 'hidden') {
		this.cards = cards
		this.type = type

		this.cards.forEach((card) => card.setStack(this))
	}

	organize(slot) {
		let { x, y } = slot.container.getBoundingClientRect()

		this.cards.forEach((card) => {
			card.element.style.left = x + 'px'
			card.element.style.top = (y + slot.verticalDistance) + 'px'
			card.element.style.zIndex = slot.verticalDistance

			slot.verticalDistance += (this.type === 'hidden' ? 10 : 50)
		})
	}

	isComplete() {
		let latestCards = this.cards.slice(this.cards.length - 13, this.cards.length)

		console.log(latestCards)

		let cardOrder = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].reverse()

		let isEqual = true

		for (let i = 0; i < latestCards.length; i++) {
			console.log(latestCards[i].value, cardOrder[i])

			if (latestCards[i].value !== cardOrder[i]) {
				isEqual = false
			}
		}

		if (isEqual) {
			let cards = this.cards.splice(this.cards.length - 13, 13)
			cards.forEach((card) => card.element.remove())
		}
	}
}
