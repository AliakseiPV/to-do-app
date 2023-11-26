import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Login } from './pages'
import Router from './router/Router'
import { SIGNUP_ROUTE, LOGIN_ROUTE, TODO_ROUTE } from "./router/consts"

function App() {

	return (
		<BrowserRouter>
			<Link to={TODO_ROUTE}>TODO</Link> <br />
			<Router />
		</BrowserRouter>
	)
}

export default App
