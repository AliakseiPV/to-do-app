import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation({
			query: (body) => ({
				url: 'user',
				method: 'POST',
				body,
			}),
			invalidatesTags: () => [{
				type: 'user'
			}]
		})
	})
})

export const { useCreateUserMutation } = userApi