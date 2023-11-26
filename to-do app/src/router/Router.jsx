import React from 'react'
import { PublicRoutes, AuthRoutes } from './routes'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from '../pages'


const Router = () => {
	return (
		<Routes>
			{PublicRoutes.map(({ path, Component }, index) =>
				<Route key={index} path={path} element={<Component />} />
			)}
			{AuthRoutes.map(({ path, Component }, index) =>
				<Route key={index} path={path} element={<Component />} />
			)}
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default Router