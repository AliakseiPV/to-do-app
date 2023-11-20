import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation({
			query: (body) => ({
				url: 'user/signUp',
				method: 'POST',
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}),
			invalidatesTags: () => [{
				type: 'user'
			}]
		})
	})
})

export const { useCreateUserMutation } = userApi