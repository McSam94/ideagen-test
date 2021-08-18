import { useCallback } from 'react'
import { persistState } from 'Utils'
import Constants from 'Configs/constants'

export const orderAction = Object.freeze({
	GET_ORDERS: 'GET_ORDERS',
	FILTER_ORDER: 'FILTER_ORDER',
	RESET_ORDER: 'RESET_ORDER'
})

export const getOrders = (dispatch) => {
	return useCallback(() => {
		dispatch({ type: orderAction.GET_ORDERS })
	}, [dispatch])
}

export const filterOrders = (dispatch) => {
	return useCallback(
		(filter) => {
			persistState(Constants.FILTER_KEY, filter, true)
			dispatch({ type: orderAction.FILTER_ORDER, payload: { filter } })
		},
		[dispatch]
	)
}

export const resetOrders = (dispatch) => {
	return useCallback(() => {
		dispatch({ type: orderAction.RESET_ORDER })
	}, [dispatch])
}
