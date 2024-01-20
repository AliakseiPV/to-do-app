import React, { useState } from 'react'
import { useCreateListMutation } from '../store/api/list.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
		<form className='flex justify-between mb-5'>
			<label className="flex flex-col text-lg text-gray-500 font-semibold w-full">
				Enter your new list name
				<input
					type="text"
					required
					value={listName.name}
					onChange={e => setListName({ ...listName, name: e.target.value })}
					className="px-4 py-1.5 my-1 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
				/>
			</label>
			<button
				onClick={addList}
				type='submit'
			>
				<FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#BBD0FF",}} />
			</button>
		</form>
	)
}

export default CreateList