import DiscoveryLayout from '../../layouts/DiscoveryLayout';
import './RequestAddFriend.scss'
import Profile from '../Profile/Profile';
import { getAllRequestAddFriend, acceptRequestAddFriend } from '../../services/api';
import NoProfile from '../../components/NoProfile/NoProfile';
import userEmpty from '../../assets/userEmpty.png'
import socket from '../../config/socketIO';

import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function RequestAddFriend() {
    return <div className="RequestAddFriend">
        <DiscoveryLayout sidebar={<SidebarRequestAddFriend />} inner={<InnerRequestAddFriend />} />
    </div>
}


const SidebarRequestAddFriend = () => {

    const { currentAuth } = useSelector(state => state.auth)
    const [requestAddFriend, setRequestAddFriend] = useState([])
    const dispatch = useDispatch()


    const handleBackPage = () => {
        window.history.back()
    }

    const getRequestAddFriend = async () => {
        const friends = await getAllRequestAddFriend(currentAuth?.auth._id)
        setRequestAddFriend(friends)
    }

    useEffect(() => {
        getRequestAddFriend()
    }, [])

    const handleAcceptRequestFriend = async (data) => {
        acceptRequestAddFriend(currentAuth.auth._id, data._id, dispatch)
        const dataEmit = {
            from: currentAuth.auth._id,
            to: data._id
        }
        socket.emit('accept_request_add_friend', dataEmit)
    }


    return <div className="SidebarRequestAddFriend">
        <div className="pt"></div>
        <div className="SidebarRequestAddFriend_back">
            <ArrowLeftOutlined onClick={handleBackPage} className='SidebarRequestAddFriend_back_icon' />
            <span>Lời mời kết bạn</span>
        </div>

        <div className="SidebarRequestAddFriend_body">
            <div className="SidebarRequestAddFriend_body_numFriend">{requestAddFriend.length} lời mời kết bạn</div>
            {
                requestAddFriend.length === 0 ?
                    <></> :
                    requestAddFriend.map(friend => {
                        return <div key={friend._id} className="SidebarRequestAddFriend_item">
                            <Link to={`/profile/${friend._id}`} className="SidebarRequestAddFriend_item_img">
                                {
                                    friend.avatar !== '' ?
                                        <div style={{ backgroundImage: `url(${friend.avatar})` }}></div> :
                                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                                }
                            </Link>
                            <div className="SidebarRequestAddFriend_item_content">
                                <span className="SidebarRequestAddFriend_item_name">{friend.username}</span>
                                <div className="SidebarRequestAddFriend_item_btn">
                                    <button onClick={() => handleAcceptRequestFriend(friend)} className='SidebarRequestAddFriend_item_btnOK'>Xác nhận</button>
                                    <button className='SidebarRequestAddFriend_item_btnDelete'>Xóa</button>
                                </div>
                            </div>

                            <div className="SidebarRequestAddFriend_item_time">1 day</div>
                        </div>
                    })
            }
        </div>
    </div>
}

const InnerRequestAddFriend = () => {

    const { id } = useParams()

    if (id !== undefined) {
        return <div className="InnerRequestAddFriend">
            <Profile />
        </div>

    } else {
        return <div className="InnerRequestAddFriend">
            <NoProfile />
        </div>
    }
}

export default RequestAddFriend;