import { filterOrder } from 'Utils'
import { orderAction } from './actions'

export default (state, action) => {
	switch (action.type) {
		case orderAction.GET_ORDERS:
			return {
				...state,
				orders: action?.payload?.orders
			}
		case orderAction.FILTER_ORDER:
			return {
				...state,
				shouldFilter: true,
				filteredOrders: filterOrder(state.orders, action?.payload?.filter)
			}
		case orderAction.RESET_ORDER:
			return {
				...state,
				shouldFilter: false,
				filteredOrders: []
			}
		default:
			throw new Error('Invalid redux actions')
	}
}
