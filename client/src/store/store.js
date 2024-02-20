import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { api } from './api/api'
import authReducer from './auth/auth.slice'

const reducers = combineReducers({
	auth: authReducer,
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})
