import { api } from './api'

export const taskApi = api.injectEndpoints({
	endpoints: builder => ({
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
	useAddTaskMutation,
	useGetTasksQuery,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = taskApi