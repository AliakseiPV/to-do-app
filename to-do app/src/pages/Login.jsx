import React, { useState } from 'react'
import { useLoginUserMutation } from '../store/api/user.api'
import { SIGNUP_ROUTE } from '../router/consts'
import { Link, useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from "../router/consts"
import { useActions } from '../hooks/useActions'
import { Banner } from '../components'



const Login = () => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const navigate = useNavigate()
	const { isAuth } = useActions()
	const [loginUser] = useLoginUserMutation()
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			const data = await loginUser(user)

			if (data.error) {
				setError(data.error.data.message)
				return
			}

			localStorage.setItem('jwt', data.data.token)
			if (localStorage.getItem('jwt')) {
				isAuth(true)
				setError('')
				navigate(TODO_ROUTE)
			}

		} catch (error) {
			console.log(error)
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
			<form
				onSubmit={handleSubmit}
				className="w-[400px] h-[450px] flex flex-col justify-center shadow-lg shadow-purple1 px-10 py-10 rounded-lg bg-white"
			>
				<h1 className="text-2xl font-bold text-gray-500 mb-10">
					<span className='text-lightblue'>Sign In</span> to your account
				</h1>
				<label className="flex flex-col mb-5 text-lg text-gray-500">
					Email
					<input
						type="email"
						placeholder='Enter your email'
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
						placeholder='Enter your password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
						required
					/>
				</label>

				<button
					type='submit'
					className='bg-lightpurple rounded-lg py-3 active:bg-purple1 mt-5 text-gray-700 font-semibold'
				>
					Sign In
				</button>
			</form>
			<div className='mt-5'>
				<span className='text-gray-700'>
					Dont have an account
				</span>
				<Link
					to={SIGNUP_ROUTE}
					className='text-lightpurple pl-5 text-lg '
				>
					Sign Up
				</Link>
			</div>
		</div>

	)
}

export default Login