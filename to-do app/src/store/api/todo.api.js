import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getLists: builder.query({
			query: () => ({
				url: '/list',
				method: 'GET',
			}),
			providesTags: [{ type: 'List' }],
		}),
		getList: builder.query({
			query: (id) => ({
				url: `/list/${id}`,
				method: 'GET',
			}),
			providesTags: [{ type: 'List' }],
		}),
		createList: builder.mutation({
			query: (body) => ({
				url: '/list',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'List' }],
		}),
		updateList: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/list/${id}`,
				method: 'PUT',
				body: body,
			}),
			invalidatesTags: [{ type: 'List' }],
		}),
		deleteList: builder.mutation({
			query: (id) => ({
				url: `/list/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'List' }],
		}),
		getTasks: builder.query({
			query: (id) => ({
				url: `/todo/${id}`,
				method: 'GET',
			}),
			providesTags: [{ type: 'Todo' }],
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
		updateTask: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/todo/${id}`,
				method: 'PUT',
				body: body,
			}),
			invalidatesTags: [{ type: 'Todo' }]
		}),
		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/todo/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Todo' }]
		}),

	})
})

export const {
	useCreateListMutation,
	useGetListsQuery,
	useGetListQuery,
	useUpdateListMutation,
	useDeleteListMutation,
	useAddTaskMutation,
	useGetTasksQuery,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = userApi