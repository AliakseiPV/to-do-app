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