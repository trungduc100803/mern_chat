import './Message.scss'

function Message({ who, content }) {
    if (who === 'send') {
        return <MessageSend content={content} />
    } else {
        return <MessageRecieved content={content} />
    }
}


const MessageRecieved = ({ content }) => {
    return <div className="MessageRecieved">
        <div className="MessageRecieved_avatar">
            <div style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrup-cpqP0Bw5YnJJ-b8YwyExZQX745APk6A&usqp=CAU)` }}></div>
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