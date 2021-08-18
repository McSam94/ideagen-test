import { getInitialState } from 'Utils/persist'
import { useReducerContext } from 'Hooks'
import OrderReducer from './reducer'
import { getOrders, filterOrders, resetOrders } from './actions'
import DummyOrders from './orders-sample'

const STORE_NAME = 'ORDER_STORE'

export const { Context, Provider } = useReducerContext({
	reducer: OrderReducer,
	actions: {
		getOrders,
		filterOrders,
		resetOrders
	},
	initialState: getInitialState(STORE_NAME) || {
		orders: DummyOrders,
		shouldFilter: false,
		filteredOrders: []
	},
	displayName: STORE_NAME,
	shouldPersist: true
})
