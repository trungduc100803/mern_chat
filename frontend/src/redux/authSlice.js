import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentAuth: null,
        success: false,
        message: ''
    },
    reducers: {
        setSuccessAuth: (state, action) => {
            state.currentAuth = action.payload
            state.success = true
        },
        setEmptyAuth: (state, action) => {
            state.currentAuth = action.payload
            state.success = false
        },
        setErrAuth: (state, action) => {
            state.currentAuth = action.payload[0]
            state.success = false
            state.message = action.payload[1]
        }
    }
})

export default authSlice.reducer
export const { setSuccessAuth, setEmptyAuth, setErrAuth } = authSlice.actions