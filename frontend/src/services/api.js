import request from "../config/axios";
import { setSuccessAuth, setEmptyAuth, setErrAuth } from '../redux/authSlice'
import { setSuccesMessage, setFailMessage, setLatestMessage } from '../redux/messageSlice'
import { setSuccessFriendSuggest, setSuccessFriendRequestAddFriend } from "../redux/friendSlice";
import { setChats } from "../redux/chatSlice";

export const login = async (data, dispatch) => {
    await request.post('auth/login', data)
        .then(res => {
            dispatch(setSuccessAuth(res.data))
        })
        .catch(err => {
            dispatch(setErrAuth([null, err.response.data.message]))
        })
}

export const logout = (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setEmptyAuth(null))
}


export const getAllAuthOwnFriend = async (dispatch, token, idAuth) => {
    await request.post('auth/get-all-auth-own-friend', {
        idAuth,
        token: `Beaer ${token}`
    })
        .then(res => {
            dispatch(setChats(res.data))
        })
        .catch(err => {
            console.log('loi')
            console.log(err)
        })
        .finally(() => {
            console.log('finally')
        })
}

export const getAllAuth = async (email, dispatch) => {
    const allAuth = await request.get(`auth/get-all-auth?email=${email}`)
    if (allAuth) {
        dispatch(setSuccessFriendSuggest(allAuth.data.allAuth))
    }
}

export const getAllAuthNotMeAndOwnFriend = async (IDAuth, dispatch) => {
    const allAuth = await request.get(`auth/get-all-auth-not-own-friend?IDAuth=${IDAuth}`)
    if (allAuth) {
        dispatch(setSuccessFriendSuggest(allAuth.data.notMeAndOwnFriendsAuth))
    }
}


export const getAllRequestAddFriend = async (IDAuth) => {
    const requestAddFriend = await request.get(`auth/get-all-auth-request-add-friend?IDAuth=${IDAuth}`)

    if (requestAddFriend) {
        return requestAddFriend.data.auth
    }
}

export const acceptRequestAddFriend = async (IDAuthAccept, IDAuthRequest, dispatch) => {
    const auth = await request.post('auth/accept-request-add-friend', {
        IDAuthAccept, IDAuthRequest
    })

    if (auth) {
        dispatch(setSuccessAuth(auth.data))
    }
}


export const getAllMessageForChat = async (dispatch, IDSender, IDUserrecevied) => {
    await request.get(`message/get-all-message-for-a-chat?IDSender=${IDSender}&IDUserRecevied=${IDUserrecevied}`)
        .then(res => {
            dispatch(setSuccesMessage(res.data))
        })
        .catch(err => {
            dispatch(setFailMessage("err when get message"))
        })
}

export const getMessageLatest = async (dispatch, IDSender, IDUserrecevied) => {
    await request.get(`message/get-all-message-for-a-chat?IDSender=${IDSender}&IDUserRecevied=${IDUserrecevied}`)
        .then(res => {
            const allMessage = res.data.messages
            dispatch(setLatestMessage(allMessage[allMessage.length - 1]))
        })
        .catch(err => {
            dispatch(setFailMessage("err when get message"))
        })
}


export const createMessage = async (IDSender, IDUserRecevied, content) => {
    await request.post('message/create-mesage', {
        IDSender,
        content,
        IDUserRecevied
    })
}

export const updateAvatar = async (IDAuth, avatar, dispatch) => {
    const auth = await request.post('auth/edit-avatar', {
        IDAuth,
        fileAvatar: avatar
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Avatar update successfully!!"
    }
}

export const updateCover = async (IDAuth, cover, dispatch) => {
    const auth = await request.post('auth/edit-cover', {
        IDAuth,
        cover
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Cover update successfully!!"
    }
}

export const updateDesc = async (IDAuth, desc, dispatch) => {
    const auth = await request.post('auth/edit-desc', {
        IDAuth,
        desc
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Desc update successfully!!"
    }
}

export const updateAddress = async (IDAuth, address, dispatch) => {
    const auth = await request.post('auth/edit-info-address', {
        IDAuth,
        address
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Address update successfully!!"
    }
}

export const updateCareer = async (IDAuth, career, dispatch) => {
    const auth = await request.post('auth/edit-infocareer', {
        IDAuth,
        career
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Career update successfully!!"
    }
}

export const updateHobby = async (IDAuth, hobby, dispatch) => {
    const auth = await request.post('auth/edit-info-hobby', {
        IDAuth,
        hobby
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "Hobby update successfully!!"
    }
}

export const updateSchool = async (IDAuth, school, dispatch) => {
    const auth = await request.post('auth/edit-info-school', {
        IDAuth,
        school
    })
    if (auth.data.success) {
        dispatch(setSuccessAuth(auth.data))
        return "School update successfully!!"
    }
}


export const getAuthByID = async (IDAuth) => {
    const auth = await request.post('auth/get-auth-byID', {
        IDAuth
    })

    if (auth) {
        if (auth.data.success) {
            return auth.data.auth
        }
    }
}

export const updateAuthByID = async (IDAuth, dispatch) => {
    const auth = await request.post('auth/get-auth-byID', {
        IDAuth
    })

    if (auth) {
        if (auth.data.success) {
            dispatch(setSuccessAuth(auth.data))
        }
    }
}

export const addFriend = async (IDAuthSendRequest, IDAuthReceviedRequest, dispatch) => {
    const auth = await request.post('auth/add-friend', {
        IDAuthSendRequest,
        IDAuthReceviedRequest
    })
    if (auth) {
        dispatch(setSuccessFriendRequestAddFriend(auth.data.auth))

        const authnew = await request.post('auth/get-auth-byID', {
            IDAuth: IDAuthSendRequest
        })

        if (authnew) {
            if (authnew.data.success) {
                dispatch(setSuccessAuth(authnew.data))
            }
        }
    }
}

export const cancelFriend = async (IDAuthSendRequest, IDAuthReceviedRequest, dispatch) => {
    const auth = await request.post('auth/cancel-friend', {
        IDAuthSendRequest,
        IDAuthReceviedRequest
    })

    if (auth) {
        if (auth.data.success) {
            dispatch(setSuccessAuth(auth.data))
        }
    }
}


export const createPost = async (IDAuth, data) => {
    const post = await request.post('post/create-post', {
        IDAuth,
        data
    })

    if (post) {
        if (post.data.success) {
            return post.data.post
        }
    }
}

export const getAllPostForAuth = async (IDAuth) => {
    const posts = await request.get(`post/get-all-post-for-auth?IDAuth=${IDAuth}`)

    if (posts) {
        if (posts.data.success) {
            return posts.data.posts
        }
    }
}