import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		error: null,
		value: false,
	},
	reducers: {
		isAuth: (state) => {
			state.value = localStorage.getItem('jwt') ? true : false
		},
	}
})


export const { actions } = authSlice
export default authSlice.reducer