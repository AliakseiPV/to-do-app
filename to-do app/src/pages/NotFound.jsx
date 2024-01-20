import React from 'react'
import { Link } from 'react-router-dom'
import { TODO_ROUTE } from '../router/consts'

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite'>
			<span className='text-gray-500 text-3xl font-semibold'>Page is not Found</span>
			<span className='font-bold text-7xl'>404</span>
			<Link className='text-[#ff7d7d] m-5' to={TODO_ROUTE}>Return Home</Link>
		</div>
	)
}

export default NotFound