import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:'post',
    initialState: {
        allPost: null
    },
    reducers: {
        setSuccessAllPost: (state, actions) => {
            state.allPost = actions.payload
        },
        addPost: (state, actions) => {
            state.allPost.unshift(actions.payload)
        }
    }
})

export default postSlice.reducer
export const {setSuccessAllPost, addPost} = postSlice.actions
