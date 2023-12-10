import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		error: null,
		value: false,
	},
	reducers: {
		isAuth: (state, {payload: auth}) => {
			state.value = auth
		},
	}
})


export const { actions } = authSlice
export default authSlice.reducer