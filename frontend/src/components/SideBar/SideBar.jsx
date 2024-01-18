import { EllipsisOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';


import './Sidebar.scss'
import Search from '../Search/Search';
import ItemChat from '../ItemChat/ItemChat';
import userEmpty from '../../assets/userEmpty.png'
import { getAllAuthOwnFriend, logout } from '../../services/api'
import { useNavigate } from 'react-router-dom'


function SideBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)
    const { chats } = useSelector(state => state.chat)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const idauth = currentAuth.auth._id
        getAllAuthOwnFriend(dispatch, token, idauth)
    }, [])

    const handleLogout = () => {
        logout(dispatch)
        navigate('/login')
    }

    return <div className="SideBar">
        <div className="sidebar_head">
            <span className='namechat'>Mern Chat</span>
            <div className="sidebar_head_action">
                <EllipsisOutlined className='sidebar_head_action_item' />
                <LogoutOutlined onClick={handleLogout} className='sidebar_head_action_item' />
                {
                    currentAuth.auth.avatar !== '' ?
                        <div className="SideBar_avatar" >
                            <div className='avatar' style={{ backgroundImage: `url(${currentAuth.auth?.avatar})` }}></div>
                        </div> :
                        <div className="SideBar_avatar" >
                            <div className='avatar' style={{ backgroundImage: `url(${userEmpty})` }}></div>
                        </div>
                }
            </div>
        </div>
        <div className="sidebar_search">
            <Search />
        </div>
        <div className="sidebar_chat">
            {
                chats?.ownFriend?.map((chat, i) => <ItemChat key={chat.email} chat={chat} />)
            }
        </div>
    </div>
}

export default SideBar;