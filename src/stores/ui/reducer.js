import { uiAction } from './actions'

export default (state, action) => {
	switch (action.type) {
		case uiAction.TOGGLE_MODAL:
			return {
				...state,
				isModalOpen: !state.isModalOpen
			}
		default:
			throw new Error('Invalid redux actions')
	}
}
