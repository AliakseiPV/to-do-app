import React, { useState } from 'react'
import { useCreateUserMutation } from '../store/api/user.api'
import { LOGIN_ROUTE } from '../router/consts'
import { Link } from 'react-router-dom'
import { Banner } from '../components'

const initialValue = {
	email: '',
	password: ''
}

const SignUp = () => {

	const [user, setUser] = useState(initialValue)
	const [createUser] = useCreateUserMutation()
	const [error, setError] = useState('')
	const [signedUp, setSignedUp] = useState('')

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			const data = await createUser(user)

			if (data.error) {
				setError(data.error.data.message)
				return
			}

			setUser(initialValue)
			setError('')
			setSignedUp(data.data)

		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite">
			{error &&
				<Banner
					message={error}
					className='bg-red-100 border border-red-400 text-rose-500 px-4 py-3 rounded mb-5'
				/>
			}
			{signedUp &&
				<Banner
					message={signedUp}
					className='bg-green-100 border border-lime-400 text-green-500 px-4 py-3 rounded mb-5'
				>
					<Link to={LOGIN_ROUTE} className='text-green-500 pl-2 '>
						Login
					</Link>
				</Banner>
			}
			<form
				onSubmit={handleSubmit}
				className="w-[400px] h-[450px] justify-center flex flex-col shadow-lg shadow-purple1 px-10 py-10 rounded-lg bg-white"
			>
				<h1 className="text-2xl font-bold text-gray-500 mb-10">
					<span className='text-lightblue'>Sign Up</span> to your account
				</h1>
				<label className="flex flex-col mb-5 text-lg text-gray-500">
					Email
					<input
						type="email"
						placeholder='User Email'
						value={user.email}
						onChange={e => setUser({ ...user, email: e.target.value })}
						required
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
					/>
				</label>
				<label className="flex flex-col mb-5 text-lg text-gray-500">
					Password
					<input
						type="password"
						placeholder='Password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						required
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
					/>
				</label>
				<button
					type='submit'
					className='bg-lightpurple rounded-lg py-3 active:bg-purple1 mt-5 text-gray-700 font-semibold'
				>
					Sign Up
				</button>
			</form>
			<div className='mt-5 text-gray-700'>
				Already have an account
				<Link
					to={LOGIN_ROUTE}
					className='text-lightpurple pl-5 text-lg'
				>
					Sign In
				</Link>
			</div>
		</div>
	)
}

export default SignUp