import Card from './Card'
import Slot from './Slot'
import Stack from './Stack'
import Stock from './Stock'

export default class Game {
	constructor() {
		this.createCards()
		this.createSlots()
		this.shuffleCards()
		this.createStacks()
		this.createStock()

		this.dragStack = []
	}

	createCards() {
		this.cards = []

		let cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

		let id = 1

		for (let i = 0; i < 8; i++) {
			this.cards.push(...cardValues.map((value) => new Card(this, value, id++)))
		}
	}

	createSlots() {
		this.slots = []

		for (let i = 0; i < 10; i++) {
			this.slots.push(new Slot(this, i))
		}
	}

	shuffleCards() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i)
			const tmp = this.cards[i]
			this.cards[i] = this.cards[j]
			this.cards[j] = tmp
		}
	}

	createStacks() {

		for (let i = 0; i < 10; i++) {
			let hiddenStack = new Stack([], 'hidden')
			let openStack = new Stack([], 'open')

			if (0 <= i && i <= 3) {
				let cards = this.drawNCards(5)
				cards.forEach((card) => card.setStack(hiddenStack))
				hiddenStack.cards.push(...cards)
			}

			else if (4 <= i && i <= 9) {
				let cards = this.drawNCards(4)
				cards.forEach((card) => card.setStack(hiddenStack))
				hiddenStack.cards.push(...cards)
			}

			let cards = this.drawNCards(1)
			cards.forEach((card) => card.setStack(openStack))
			openStack.cards.push(...cards)

			this.slots[i].hiddenStack = hiddenStack
			this.slots[i].openStack = openStack

			this.slots[i].organize()
		}
	}

	createStock() {
		this.stock = new Stock(this)

		let stack = new Stack(this.cards, 'hidden')

		this.stock.setStack(stack)
	}

	drawNCards(n) {
		let cards = []

		for (let i = 1; i <= n; i++) {
			let card = this.cards.pop()
			cards.push(card)
		}

		return cards
	}
}
