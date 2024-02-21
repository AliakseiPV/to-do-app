import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'aoi',
	tagTypes: ['User', 'List', 'Todo'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('jwt')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: builder => ({
		getUser: builder.query({
			query: (id) => `user/${id}`,
			providesTags: [{ type: 'User' }]
		})
	}),
})