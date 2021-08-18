import React from 'react'
import ReactDom from 'react-dom'
import { debugContextDevtool } from 'react-context-devtool'
import App from './App'
import './App.scss'

const appContainer = document.getElementById('idg-app')

ReactDom.render(<App />, appContainer)

debugContextDevtool(appContainer, {
	debugReducer: true,
	debugContext: true,
	disable: process.env.NODE_ENV !== 'development'
})
