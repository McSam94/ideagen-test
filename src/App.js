import React from 'react'
import Home from 'Pages/home'
import { Providers } from 'Stores'

function App() {
	return (
		<Providers>
			<Home />
		</Providers>
	)
}

export default App
