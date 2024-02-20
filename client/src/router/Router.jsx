import React from 'react'
import { PublicRoutes, AuthRoutes } from './routes'
import { Routes, Route } from 'react-router-dom'
import { Login, NotFound } from '../pages'
import { useAuth } from '../hooks/useAuth'

const Router = () => {
	
	const { auth } = useAuth()

	return (
		<Routes>
			{PublicRoutes.map(({ path, Component }, index) =>
				<Route key={index} path={path} element={<Component />} />
			)}
			{auth && AuthRoutes.map(({ path, Component }, index) =>
				<Route key={index} path={path} element={<Component />} />
			)}
			{auth ?
				<Route path='*' element={<NotFound />} />
				:
				<Route path='*' element={<Login />} />
			}
		</Routes>
	)
}

export default Router