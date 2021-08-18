import React from 'react'
import { Context as UiContext, Provider as UiProvider } from './ui'
import { Context as OrderContext, Provider as OrderProvider } from './order'

const Providers = ({ children }) => {
	return (
		<UiProvider>
			<OrderProvider>{children}</OrderProvider>
		</UiProvider>
	)
}

export { Providers, OrderContext, UiContext }
