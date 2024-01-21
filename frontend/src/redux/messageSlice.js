import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        allMessage: null,
        errMessage: '',
        latestMessage: null
    },
    reducers: {
        setSuccesMessage: (state, actions) => {
            state.allMessage = actions.payload
        },
        setFailMessage: (state, actions) => {
            state.allMessage = null
            state.errMessage = actions.payload
        },
        setLatestMessage: (state, actions) => {
            state.latestMessage = actions.payload
        }
    }
})


export default messageSlice.reducer
export const { setSuccesMessage, setFailMessage, setLatestMessage } = messageSlice.actions