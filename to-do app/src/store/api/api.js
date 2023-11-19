import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['user'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
	}),
	endpoints: builder => ({
		getUser: builder.query({
			query: (id) => `users/${id}`,
			providesTags: () => [{
				type: 'user'
			}]
		})
	})
})