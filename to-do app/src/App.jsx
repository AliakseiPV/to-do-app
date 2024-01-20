import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router'
import { useCheckUserQuery } from './store/api/user.api'
import { useActions } from './hooks/useActions'


function App() {

	const { isLoading, data, isSuccess } = useCheckUserQuery()
	const { isAuth } = useActions()

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('jwt', data.token)
			isAuth(true)
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
