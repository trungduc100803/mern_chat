import './ItemChat.scss'
import userEmpty from '../../assets/userEmpty.png'
import { setChat } from '../../redux/chatSlice'

import { EllipsisOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

function ItemChat({ chat }) {

    const dispatch = useDispatch()

    const handleSelectChat = (event) => {
        const allItemChat = document.querySelectorAll('.itemChat')
        allItemChat.forEach(chat => {
            chat.classList.remove('active')
        })
        event.target.classList.add('active')
        dispatch(setChat(chat))

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
            <div className="itemChat_message">
                <div className="itemChat_usersend">You:</div>
                <div className="itemChat_content_message">hello</div>
            </div>
        </div>
        <EllipsisOutlined className='itemChat_setting' />
    </div>
}

export default ItemChat;