import './HomeChat.scss'
import userEmpty from '../../assets/userEmpty.png'
import { getAllMessageForChat, createMessage } from '../../services/api'
import Message from '../../components/Message/Message'
import socket from '../../config/socketIO'


import { toast } from 'react-toastify'
import {
    PhoneOutlined, VideoCameraOutlined,
    InfoCircleOutlined, AudioOutlined,
    FileImageOutlined, LikeOutlined
}
    from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'



function HomeChat() {

    const dispatch = useDispatch()
    const { chat } = useSelector(state => state.chat)
    const { currentAuth } = useSelector(state => state.auth)
    const { allMessage } = useSelector(state => state.message)


    const handleSubmitMessage = (event) => {
        event.preventDefault()
        const content = event.target[1].value
        if (content === "") {
            toast.warning("Bạn chưa nhập nội dung tin nhắn!!!")
        } else {
            event.target[1].value = ''
            createMessage(currentAuth.auth._id, chat._id, content)
            const data = {
                from: currentAuth.auth._id,
                to: chat._id,
                content: content
            }
            socket.emit('send-message', data)
        }
    }


    useEffect(() => {
        getAllMessageForChat(dispatch, currentAuth.auth._id, chat._id)
    }, [])

    useEffect(() => {
        socket.on('recevie-message', data => {
            console.log(data)
        })
    }, [])


    console.log(chat)


    return <div className="HomeChat">
        {
            chat === null ?
                <></> :

                <div className="homechat_inner">

                    <div className="HomeChat_head">
                        <div className="HomeChat_left">
                            {
                                chat.avatar !== '' ?
                                    <div className="HomeChat_avatar">
                                        <div style={{ backgroundImage: `url(${chat.avatar})` }}></div>
                                    </div> :
                                    <div className="HomeChat_avatar">
                                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                                    </div>
                            }

                            <div className="HomeChat_info">
                                <div className="HomeChat_info_username">{chat?.username}</div>
                                <div className="HomeChat_info_status">Dang hoạt động</div>
                            </div>
                        </div>

                        <div className="HomeChat_media">
                            <PhoneOutlined className='HomeChat_media_item' />
                            <VideoCameraOutlined className='HomeChat_media_item' />
                            <InfoCircleOutlined className='HomeChat_media_item' />
                        </div>
                    </div>

                    <div className="HomeChat_content">
                        <div className="HomeChat_content_intro">
                            {
                                chat.avatar !== '' ?
                                    <div className="HomeChat_content_intro_avatar">
                                        <div style={{ backgroundImage: `url(${chat?.avatar})` }}></div>
                                    </div> :
                                    <div className="HomeChat_content_intro_avatar">
                                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                                    </div>
                            }

                            <div className="HomeChat_content_intro_name">{chat?.username}</div>
                            <div className="HomeChat_content_intro_more">Sống tại Hà Nội</div>
                        </div>

                        <div className="HomeChat_content_inner">
                            {
                                allMessage.messages.map((message, i) => {
                                    if (message.sender === currentAuth.auth._id) {
                                        return <Message key={i} who={'send'} content={"hi"} />
                                    } else {
                                        return <Message key={i} who={'send'} content={"hi"} />
                                    }
                                })

                            }

                        </div>
                    </div>


                    <form onSubmit={handleSubmitMessage} className="HomeChat_task">
                        <AudioOutlined className='HomeChat_task_action' />

                        <label htmlFor="fileChat">
                            <FileImageOutlined className='HomeChat_task_action' />
                        </label>
                        <input type="file" name="file" id="fileChat" hidden />

                        <div className="HomeChat_task_input">
                            <input type="text" placeholder='Aa' name='message' id='message' />
                        </div>
                        <LikeOutlined className='HomeChat_task_action HomeChat_task_like' />
                    </form>
                </div>
        }
    </div>
}

export default HomeChat;