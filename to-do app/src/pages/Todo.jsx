import React from 'react'
import TaskList from '../components/TaskList'
import Task from '../components/Task'



const Todo = () => {
	return (
		<div>
			<TaskList>
				<Task />
				<Task />
				<Task />
			</TaskList>
		</div>
	)
}

export default Todo