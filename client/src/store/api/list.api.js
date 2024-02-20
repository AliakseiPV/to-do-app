import { api } from './api'

export const listApi = api.injectEndpoints({
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
	})
})

export const {
	useCreateListMutation,
	useGetListsQuery,
	useGetListQuery,
	useUpdateListMutation,
	useDeleteListMutation,
} = listApi