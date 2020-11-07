export default class Slot {
	constructor(game, id) {
		this.game = game
		this.id = id

		this.hiddenStack = []
		this.openStack = []

		this.container = document.querySelector(`#slot-${id}`)

		this.addEvents()
	}

	organize() {
		this.verticalDistance = 0
		this.hiddenStack.organize(this)
		this.openStack.organize(this)

		if (this.openStack.cards.length === 0 && this.hiddenStack.cards.length > 0) {
			let card = this.hiddenStack.cards.pop()
			card.setStack(this.openStack)
			this.openStack.cards.push(card)
		}
	}

	addEvents() {
		this.container.addEventListener('drag', (e) => this.onDrag(e))
		this.container.addEventListener('dragover', (e) => this.onDragOver(e))
		this.container.addEventListener('drop', (e) => this.onDrop(e))
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

		let targetSlot = this
		let targetStack = targetSlot.openStack

		let indexCardStack = sourceStack.cards.findIndex((card) => card.id === sourceCard.id)

		if (this.hiddenStack.cards.length === 0 && this.openStack.cards.length === 0) {
			console.log(123 )
			sourceCard.stack = targetStack

			let dragStack = sourceSlot.openStack.cards.slice(indexCardStack, sourceSlot.openStack.cards.length)

			sourceSlot.openStack.cards = sourceSlot.openStack.cards.slice(0, indexCardStack)

			targetStack.cards.push(...dragStack)

			targetSlot.organize()
			sourceSlot.organize()
		}

	}
}
