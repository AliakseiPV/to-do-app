import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation({
			query: (body) => ({
				url: 'user/signup',
				method: 'POST',
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}),
			invalidatesTags: [{ type: 'User' }]
		}),
		loginUser: builder.mutation({
			query: (body) => ({
				url: '/user/login',
				method: 'POST',
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}),
			invalidatesTags: () => [{
				type: 'user'
			}]
		}),
		checkUser: builder.query({
			query: () => ({
				url: '/user/auth',
				method: 'GET',
			}),
		})
	})
})

export const { useCreateUserMutation, useLoginUserMutation, useCheckUserQuery } = userApi