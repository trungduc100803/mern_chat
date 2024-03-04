import './HomeChat.scss'
import userEmpty from '../../assets/userEmpty.png'
import { getAllMessageForChat, createMessage, getMessageLatest } from '../../services/api'
import Message from '../../components/Message/Message'
import socket from '../../config/socketIO'
import { setShowWelcome } from '../../redux/showWelcome'
import Welcome from '../../components/Welcome/Welcome'
import { convertToBase64 } from '../../utils'




import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify'
import {
    PhoneOutlined, VideoCameraOutlined,
    InfoCircleOutlined, AudioOutlined,
    FileImageOutlined, LikeOutlined,
    SmileOutlined
}
    from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'



function HomeChat() {

    const dispatch = useDispatch()
    const { chat } = useSelector(state => state.chat)
    const profile = chat?.profile
    const { currentAuth } = useSelector(state => state.auth)
    const [message, setMessage] = useState('')
    const [files, setFiles] = useState([])
    const { allMessage } = useSelector(state => state.message)
    const { status } = useSelector(state => state.welcome)
    const [openEmoji, setOpenEmoji] = useState(false)

    const handleSubmitMessage = (event) => {
        event.preventDefault()
        const content = [message, ...files]
        const frameChat = document.querySelector('.HomeChat_content')
        setMessage('')
        setFiles([])
        createMessage(currentAuth.auth._id, chat._id, content)
        getAllMessageForChat(dispatch, currentAuth.auth._id, chat._id)
        // getMessageLatest(dispatch, currentAuth.auth._id, chat._id)
        frameChat.scrollTop = frameChat.scrollHeight
        const data = {
            from: currentAuth.auth._id,
            to: chat._id,
            content
        }

        socket.emit('send-message', data)
    }




    useEffect(() => {
        socket.on('recevie-message', data => {
            getAllMessageForChat(dispatch, currentAuth.auth._id, chat._id)
            getMessageLatest(dispatch, currentAuth.auth._id, chat._id)
            const frameChat = document.querySelector('.HomeChat_content')
            if (frameChat) {
                frameChat.scrollTop = frameChat.scrollHeight
            }
        })

        dispatch(setShowWelcome())
    }, [])


    useEffect(() => {
        const frameChat = document.querySelector('.HomeChat_content')
        if (status === false) frameChat.scrollTop = frameChat.scrollHeight
    }, [status])

    const handleOpenEmoji = () => {
        setOpenEmoji(!openEmoji)
    }

    const handleClickEmoji = (emoji) => {
        setMessage(prev => prev + emoji.emoji)
    }

    const handleChangeFile = async event => {
        const listFile = event.target.files
        for (let i = 0; i < listFile.length; i++) {
            const filebase64 = await convertToBase64(listFile[i])
            setFiles(prevFile => [...prevFile, filebase64])
        }

    }



    return <div className="HomeChat">
        {
            status === true ?
                <Welcome /> :

                <div className="homechat_inner">

                    <div className="HomeChat_head">
                        <div className="HomeChat_left">
                            {
                                chat?.avatar !== '' ?
                                    <div className="HomeChat_avatar">
                                        <div style={{ backgroundImage: `url(${chat?.avatar})` }}></div>
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
                                chat?.avatar !== '' ?
                                    <div className="HomeChat_content_intro_avatar">
                                        <div style={{ backgroundImage: `url(${chat?.avatar})` }}></div>
                                    </div> :
                                    <div className="HomeChat_content_intro_avatar">
                                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                                    </div>
                            }

                            <div className="HomeChat_content_intro_name">{chat?.username}</div>
                            <div className="HomeChat_content_intro_more">{profile?.address}</div>
                            <div className="HomeChat_content_intro_more">{profile?.career}</div>
                            <div className="HomeChat_content_intro_more">{profile?.school}</div>
                        </div>

                        <div className="HomeChat_content_inner">
                            {
                                allMessage === null ?
                                    <></> :
                                    allMessage?.messages.map((message, i) => {
                                        if (message.content.length > 1) {
                                            const listMessage = message.content
                                            return listMessage.map(m => {
                                                return <Message key={m} avatar={chat.avatar} who={message.sender} content={m} />
                                            })
                                        } else {
                                            return <Message key={i} avatar={chat.avatar} who={message.sender} content={message.content} />
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
                        <div className="HomeChat_task_emoji">
                            <SmileOutlined onClick={handleOpenEmoji} className='HomeChat_task_action' />
                            <EmojiPicker className='HomeChat_task_emojiPicker' open={openEmoji} onEmojiClick={e => handleClickEmoji(e)} />

                        </div>
                        <input multiple onChange={e => handleChangeFile(e)} type="file" name="file" id="fileChat" hidden />

                        <div className="HomeChat_task_input">
                            <input onChange={e => setMessage(e.target.value)} value={message} type="text" placeholder='Aa' name='message' id='message' />
                            {
                                files.length !== 0 ?
                                    files.map(file => {
                                        if (file.includes('data:video')) {
                                            return <video key={file} className='HomeChat_task_input_file' src={file}></video>
                                        }
                                        return <input key={file} multiple className='HomeChat_task_input_file' type="image" src={file} alt="" />
                                    }) :
                                    <></>
                            }
                        </div>
                        <LikeOutlined className='HomeChat_task_action HomeChat_task_like' />
                    </form>
                </div>
        }
    </div>
}

export default HomeChat;