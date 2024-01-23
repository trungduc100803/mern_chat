import { EllipsisOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';


import './Sidebar.scss'
import Search from '../Search/Search';
import ItemChat from '../ItemChat/ItemChat';
import userEmpty from '../../assets/userEmpty.png'
import { getAllAuthOwnFriend, logout } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'


function SideBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)
    const { chats } = useSelector(state => state.chat)
    const [visibilityMoreOptiopns, setVisibilityMoreOptiopns] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')
        const idauth = currentAuth.auth._id
        getAllAuthOwnFriend(dispatch, token, idauth)
    }, [])

    const handleLogout = () => {
        logout(dispatch)
        navigate('/login')
    }

    const handleShowMore = () => {
        setVisibilityMoreOptiopns(!visibilityMoreOptiopns)
    }

    return <div className="SideBar">
        <div className="sidebar_head">
            <span className='namechat'>Mern Chat</span>
            <div className="sidebar_head_action">
                <div className="more_options">
                    <EllipsisOutlined className='sidebar_head_action_item ' onClick={handleShowMore} />
                    <div className={visibilityMoreOptiopns ? 'more_options_dropdown active' : 'more_options_dropdown'}>
                        <Link to={'/discovery'} className="more_options_item">
                            <UsergroupAddOutlined className='more_options_item_icon' />
                            <p>Khám phá</p>
                        </Link>
                        <Link className="more_options_item">
                            <UsergroupAddOutlined className='more_options_item_icon' />
                            <p>Khám phá</p>
                        </Link>
                    </div>

                </div>
                <LogoutOutlined onClick={handleLogout} className='sidebar_head_action_item' />
                {
                    currentAuth.auth.avatar !== '' ?
                        <Link className="SideBar_avatar" >
                            <div className='avatar' style={{ backgroundImage: `url(${currentAuth.auth?.avatar})` }}></div>
                        </Link> :
                        <Link className="SideBar_avatar" >
                            <div className='avatar' style={{ backgroundImage: `url(${userEmpty})` }}></div>
                        </Link>
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