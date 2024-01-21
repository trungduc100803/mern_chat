import './Message.scss'
import userEmpty from '../../assets/userEmpty.png'

import { useSelector } from 'react-redux';


function Message({ who, content, avatar }) {
    const { currentAuth } = useSelector(state => state.auth)

    if (who === currentAuth.auth._id) {
        return <MessageSend content={content} avatar={avatar} />
    } else {
        return <MessageRecieved content={content} avatar={avatar} />
    }
}


const MessageRecieved = ({ content, avatar }) => {
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

const MessageSend = ({ content }) => {
    return <div className="MessageSend">
        <div className="MessageSend_text">{content}</div>
    </div>
}

export default Message;