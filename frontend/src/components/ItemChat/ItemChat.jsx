import './ItemChat.scss'
import userEmpty from '../../assets/userEmpty.png'
import { setChat } from '../../redux/chatSlice'
import { getAllMessageForChat, getMessageLatest } from '../../services/api'
import { setHideWelcome } from '../../redux/showWelcome'

import { EllipsisOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function ItemChat({ chat }) {

    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)
    const { latestMessage } = useSelector(state => state.message)


    useEffect(() => {
        getMessageLatest(dispatch, currentAuth.auth._id, chat._id)
    }, [])



    const handleSelectChat = (event) => {
        const allItemChat = document.querySelectorAll('.itemChat')
        allItemChat.forEach(chat => {
            chat.classList.remove('active')
        })
        getAllMessageForChat(dispatch, currentAuth.auth._id, chat._id)
        event.target.classList.add('active')
        dispatch(setChat(chat))
        dispatch(setHideWelcome())
    }

    return <div className="itemChat" onClick={event => handleSelectChat(event)}>
        {
            chat.avatar !== '' ?
                <div className="itemChat_avatar" >
                    <div className='avatar' style={{ backgroundImage: `url(${chat.avatar})` }}></div>
                </div> :
                <div className="itemChat_avatar" >
                    <div className='avatar' style={{ backgroundImage: `url(${userEmpty})` }}></div>
                </div>
        }
        <div className="itemChat_content">
            <div className="itemChat_name">{chat.username}</div>
            {/* <div className="itemChat_message">
                {
                    latestMessage?.sender === currentAuth.auth._id ?
                        <>
                            <div className="itemChat_usersend">You:</div>
                            <div className="itemChat_content_message">{latestMessage.content}</div>
                        </> :
                        <>
                            <div className="itemChat_usersend">huy:</div>
                            <div className="itemChat_content_message">{latestMessage?.content}</div>
                        </>
                }
            </div> */}
        </div>
        <EllipsisOutlined className='itemChat_setting' />
    </div>
}

export default ItemChat;