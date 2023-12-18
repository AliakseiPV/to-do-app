import React from 'react'
import { useGetListQuery } from '../store/api/todo.api'
import { TaskList } from '../components'
import { useParams } from 'react-router-dom'

function List() {
	const { id } = useParams()
	const { data: list, isSuccess, isLoading } = useGetListQuery(id)

	if (isSuccess && !list) {
		return <div>List does not exist</div>
	}

	if (isLoading) {
		return <div>Here should be spinner</div>
	}

	return (
		<div>

			
			{isSuccess &&
				<TaskList
					listName={list.name}
					listId={list.id}
				/>
			}


		</div>
	)
}

export default List