import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: null,
        chat: null
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setChat: (state, action) => {
            state.chat = action.payload
        },
    }
})


export default chatSlice.reducer
export const { setChats, setChat } = chatSlice.actions