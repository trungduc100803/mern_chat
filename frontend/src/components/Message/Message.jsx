import './Message.scss'
import userEmpty from '../../assets/userEmpty.png'

import { useSelector } from 'react-redux';
import { Image } from 'antd';


function Message({ who, content, avatar }) {
    const { currentAuth } = useSelector(state => state.auth)

    if (who === currentAuth.auth._id) {
        return <MessageSend content={content} avatar={avatar} />
    } else {
        return <MessageRecieved content={content} avatar={avatar} />
    }
}


const MessageRecieved = ({ content, avatar }) => {

    if (content.includes('data:image/')) {
        return <div className="MessageRecieved">
            <div className="MessageRecieved_avatar">
                {
                    avatar === '' ?
                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                        :
                        <div style={{ backgroundImage: `url(${avatar})` }}></div>

                }
            </div>

            <Image className='MessageRecieved_file' src={content} />
        </div>
    } else if (content.includes('data:video/')) {
        return <div className="MessageRecieved">
            <div className="MessageRecieved_avatar">
                {
                    avatar === '' ?
                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                        :
                        <div style={{ backgroundImage: `url(${avatar})` }}></div>

                }
            </div>

            <video className='MessageRecieved_file' src={content} controls={true}></video>
        </div>
    } else if (content === '') {
        return <></>
    }
    else {
        return <div className="MessageRecieved">
            <div className="MessageRecieved_avatar">
                {
                    avatar === '' ?
                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                        :
                        <div style={{ backgroundImage: `url(${avatar})` }}></div>

                }
            </div>

            <div className="MessageRecieved_text">{content}</div>
        </div>

    }
}

const MessageSend = ({ content }) => {
    if (content.includes('data:image/')) {
        return <div className="MessageSend">
            <Image className='MessageSend_file' src={content} />
        </div>
    } else if (content.includes('data:video/')) {
        return <div className="MessageSend">
            <video className='MessageSend_file' controls={true} src={content}></video>
        </div>
    } else if (content === '') {
        return <></>
    } else {
        return <div className="MessageSend">
            <div className="MessageSend_text">{content}</div>
        </div>

    }
}

export default Message;