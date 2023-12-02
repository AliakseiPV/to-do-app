import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Login } from './pages'
import Router from './router/Router'
import { useCheckUserQuery } from './store/api/user.api'
import { SIGNUP_ROUTE, LOGIN_ROUTE, TODO_ROUTE } from "./router/consts"

function App() {

	const {isLoading, data, isSuccess} = useCheckUserQuery()

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('jwt', data.token)
			console.log(localStorage.getItem('jwt'))
		}
	}, [isSuccess])

	if (isLoading) {
		return <div>Here should be spinner</div>
	}

	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	)
}

export default App
