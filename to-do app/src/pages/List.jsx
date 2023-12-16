import React from 'react'
import { useGetListQuery } from '../store/api/todo.api'
import { TaskList } from '../components'

function List() {


	const id = window.location.pathname.split('/').pop()
	const { data: list, isSuccess, isLoading } = useGetListQuery(id)


	if (isLoading) {
		return <div>Here should be spinner</div>
	}

	return (
		<div>

			{isSuccess && <TaskList listName={list.name} listId={list.id} />}
			
		</div>
	)
}

export default List