import React, { useState } from 'react'
import { useCreateListMutation } from '../store/api/todo.api'


const initialData = {
	name: ''
}

function CreateList() {

	const [listName, setListName] = useState(initialData)
	const [createList] = useCreateListMutation()

	const addList = async (e) => {
		try {
			e.preventDefault()
			await createList(listName)
			setListName(initialData)
		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<form>
			<label>
				Enter your new list name
				<input
					type="text"
					value={listName.name}
					onChange={e => setListName({ ...listName, name: e.target.value })}
				/>
			</label>
			<button onClick={addList} type='submit'>Add new list</button>
		</form>
	)
}

export default CreateList