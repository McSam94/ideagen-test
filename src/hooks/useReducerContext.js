import React, { useReducer, createContext, useEffect } from 'react'
import { persistState } from 'Utils'

export const useReducerContext = ({
	reducer,
	actions,
	initialState,
	displayName,
	shouldPersist
}) => {
	const Context = createContext(initialState)

	// eslint-disable-next-line react/prop-types
	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState)

		useEffect(() => {
			if (shouldPersist) {
				persistState(displayName, state)
			}
		}, [state])

		const boundActions = {}
		for (const key in actions) {
			boundActions[key] = actions[key](dispatch)
		}

		return (
			<Context.Provider
				value={{ ...state, ...boundActions }}
				displayName={displayName}
			>
				{children}
			</Context.Provider>
		)
	}

	return { Context, Provider }
}
