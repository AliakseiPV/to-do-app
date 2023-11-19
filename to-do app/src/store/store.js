import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {api} from './api/api'

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})
