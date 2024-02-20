import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'

function Modal(props) {
	const { clickHandler, listId, listName } = props
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('')

	return (
		<>
			<button
				type="button"
				onClick={() => setShowModal(true)}
			>
				<FontAwesomeIcon icon={faPenNib} size='lg' className='text-lightblue ml-2  -translate-y-3' />
			</button>
			{showModal ? (
				<>
					<div
						className="flex justify-center items-center overflow-x-hidden  fixed inset-0 z-50  "
					>
						<div className="relative w-auto  max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">

								<div className="flex flex-col items-center gap-5 p-5">
									<h3 className="text-xl text-gray-500 font-semibold">
										Change list name
									</h3>
									<input
										type="text"
										value={name}
										onChange={e => setName(e.target.value)}
										placeholder='Enter new list name...'
										className='w-full focus:outline-none px-2 mt-5 text-gray-500'
									/>
								</div>

								<div className="flex items-center p-5 ">
									<button
										className="text-[#ff7d7d] background-transparent font-bold px-6 py-2 text-base "
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-[#69d481] text-white active:bg-[#72e68b] font-bold text-base px-4 py-2 rounded shadow hover:shadow-lg "
										type="button"
										onClick={() => {
											clickHandler(listId, listName, name)
											setName('')
											setShowModal(false)
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>)
}

export default Modal