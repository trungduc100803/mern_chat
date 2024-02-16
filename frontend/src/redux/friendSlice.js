import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friendsSuggest: null,
        friendRequestAddFriend: null,
        allFriend: null
    },
    reducers: {
        setSuccessFriendSuggest: (state, actions) => {
            state.friendsSuggest = actions.payload
        },
        setSuccessFriendRequestAddFriend: (state, actions) => {
            if (state.friendRequestAddFriend === null) {
                state.friendRequestAddFriend = [actions.payload]
            } else {
                const arr = state.friendRequestAddFriend
                state.friendRequestAddFriend = [...arr, actions.payload]
            }
        },
        deleteFriendRequestAddFriend: state => {
            state.friendRequestAddFriend = null
        }
    }
})


export default friendSlice.reducer
export const { setSuccessFriendSuggest, setSuccessFriendRequestAddFriend, deleteFriendRequestAddFriend } = friendSlice.actions