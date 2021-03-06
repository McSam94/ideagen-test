import { getInitialState } from 'Utils/persist'
import { useReducerContext } from 'Hooks'
import UiReducer from './reducer'
import { toggleModal } from './actions'

const STORE_NAME = 'UI_STORE'

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
	reducer: UiReducer,
	actions: {
		toggleModal
	},
	initialState: getInitialState(STORE_NAME) || {
		isModalOpen: false
	},
	displayName: STORE_NAME,
	shouldPersist: true
})
