/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'

export const uiAction = Object.freeze({
	TOGGLE_MODAL: 'TOGGLE_MODAL'
})

export const toggleModal = (dispatch) => {
	return useCallback(() => {
		dispatch({ type: TOGGLE_MODAL })
	}, [dispatch])
}
