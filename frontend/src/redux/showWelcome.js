import { createSlice } from '@reduxjs/toolkit'


const welcome = createSlice({
    name: 'welcome',
    initialState: {
        statusWelcome: true
    },
    reducers: {
        setHideWelcome: (state) => {
            state.status = false
        },
        setShowWelcome: (state) => {
            state.status = true
        }
    }
})


export default welcome.reducer
export const { setHideWelcome, setShowWelcome } = welcome.actions