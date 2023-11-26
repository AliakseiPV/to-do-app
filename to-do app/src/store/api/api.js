import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['user'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
	}),
	endpoints: builder => ({
		getUser: builder.query({
			query: (id) => `user/${id}`,
			providesTags: () => [{
				type: 'user'
			}]
		})
	})
})