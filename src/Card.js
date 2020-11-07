export default class Card {
	constructor(game, value, id) {
		this.game = game

		this.value = value
		this.id = id

		this.stack = []

		this.buildElement()
		this.addEvents()
	}

	buildElement() {
		this.element = document.createElement('div')
		this.element.innerHTML = this.value
		this.element.id = this.id
		this.element.classList.add('card')
		this.element.setAttribute('draggable', true)

		document.body.appendChild(this.element)
	}

	addEvents() {
		this.element.addEventListener('dragstart', (e) => this.onDragStart(e))
		this.element.addEventListener('drag', (e) => this.onDrag(e))
		this.element.addEventListener('dragover', (e) => this.onDragOver(e))
		this.element.addEventListener('drop', (e) => this.onDrop(e))
	}

	setStack(stack) {
		this.stack = stack

		if (this.stack.type === 'hidden') {
			this.element.classList.add('hidden')
		} else {
			this.element.classList.remove('hidden')
		}
	}

	onDragStart(e) {
		e.dataTransfer.setData('id', this.id)
	}

	onDrag(e) {
		e.preventDefault()
	}

	onDragOver(e) {
		e.preventDefault()
	}

	onDrop(e) {
		let x = Number(e.dataTransfer.getData('id'))

		let sourceSlot = this.game.slots.find((slot) => slot.openStack.cards.find((card) => card.id === x))
		let sourceStack = sourceSlot.openStack
		let sourceCard = sourceStack.cards.find((card) => card.id === x)

		let targetSlot = this.game.slots.find((slot) => slot.openStack.cards.find((card) => card.id === this.id))
		let targetStack = targetSlot.openStack
		let targetCard = this

		let indexCardStack = sourceStack.cards.findIndex((card) => card.id === sourceCard.id)

		if (this.compareCards(targetCard, sourceCard) && sourceSlot.id !== targetSlot.id) {
			sourceCard.stack = targetStack

			let dragStack = sourceSlot.openStack.cards.slice(indexCardStack, sourceSlot.openStack.cards.length)

			sourceSlot.openStack.cards = sourceSlot.openStack.cards.slice(0, indexCardStack)

			targetStack.cards.push(...dragStack)

			targetSlot.organize()
			sourceSlot.organize()

			targetSlot.openStack.isComplete()
		}
	}

	compareCards(card1, card2) {
		let cardOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

		return cardOrder.indexOf(String(card1.value)) - cardOrder.indexOf(String(card2.value)) === 1
	}
}
