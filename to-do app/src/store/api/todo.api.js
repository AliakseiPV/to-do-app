import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getLists: builder.query({
			query: () => ({
				providesTags: [{ type: 'List' }],
				url: '/list',
				method: 'GET',
			}),
		}),
		getList: builder.query({
			query: (id) => ({
				providesTags: [{ type: 'List' }],
				url: `/list/${id}`,
				method: 'GET',
			}),
		}),
		createList: builder.mutation({
			query: (body) => ({
				url: '/list',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'List' }],
		}),
		getTasks: builder.query({
			query: (id) => ({
				providesTags: [{ type: 'Todo' }],
				url: `/todo/${id}`,
				method: 'GET',
			}),
		}),
		addTask: builder.mutation({
			query: (body) => ({
				url: '/todo',
				method: 'POST',
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}),
			invalidatesTags: [{ type: 'Todo' }]
		}),

	})
})

export const {
	useCreateListMutation,
	useGetListsQuery,
	useGetListQuery,
	useAddTaskMutation,
	useGetTasksQuery,
} = userApi