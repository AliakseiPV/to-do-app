import { SIGNUP_ROUTE, LOGIN_ROUTE, TODO_ROUTE, LIST_ROUTE } from "./consts"
import { Login, SignUp, Todo, List } from '../pages'

export const PublicRoutes = [
	{
		path: SIGNUP_ROUTE,
		Component: SignUp
	},
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]

export const AuthRoutes = [
	{
		path: TODO_ROUTE,
		Component: Todo
	},
	{
		path: LIST_ROUTE + '/:id',
		Component: List
	}
]