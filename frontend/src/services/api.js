import request from "../config/axios";
import { setSuccessAuth, setEmptyAuth, setErrAuth } from '../redux/authSlice'
import { setSuccesMessage, setFailMessage } from '../redux/messageSlice'
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


export const getAllMessageForChat = async (dispatch, IDSender, IDUserrecevied) => {
    await request.get(`message/get-all-message-for-a-chat?IDSender=${IDSender}&IDUserRecevied=${IDUserrecevied}`)
        .then(res => {
            dispatch(setSuccesMessage(res.data))
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
