import React, { useState } from 'react'

function Modal(props) {
	const { clickHandler, listId, listName } = props
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('')

	return (
		<>
			<button
				className="bg-indigo-500 text-white active:bg-indigo-600 px-5 py-3 rounded-lg outline-none focus:outline-none ease-linear"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Change list name
			</button>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										Change list name
									</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<input type="text" value={name} onChange={e => setName(e.target.value)} />
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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