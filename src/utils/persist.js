export const persistState = (storageKey, state, isSession = false) => {
	window[isSession ? 'sessionStorage' : 'localStorage'].setItem(
		storageKey,
		JSON.stringify(state)
	)
}

export const getInitialState = (storageKey, isSession = false) => {
	const savedState =
		window[isSession ? 'sessionStorage' : 'localStorage'].getItem(storageKey)
	try {
		if (!savedState) {
			return undefined
		}
		return JSON.parse(savedState || '{}')
	} catch (e) {
		throw new Error(e)
	}
}

export const removeState = (storageKey, isSession = false) => {
	window[isSession ? 'sessionStorage' : 'localStorage'].removeItem(storageKey)
}
