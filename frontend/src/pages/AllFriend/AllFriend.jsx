import './AllFriend.scss'
import DiscoveryLayout from '../../layouts/DiscoveryLayout';
import userEmpty from '../../assets/userEmpty.png'
import Profile from '../Profile/Profile';
import NoProfile from '../../components/NoProfile/NoProfile';
import request from '../../config/axios';

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function AllFriend() {
    return <div className="AllFriend">
        <DiscoveryLayout sidebar={<AllFriendSidebar />} inner={<AllFriendInner />} />
    </div>
}


const AllFriendSidebar = () => {

    const { currentAuth } = useSelector(state => state.auth)
    const [allOwnFriend, setAllOwnFriend] = useState([])


    const handleBackPage = () => {
        window.history.back()
    }

    const getAllAuthOwnFriend = async () => {
        const token = localStorage.getItem('token')
        const allAuth = await request.post('auth/get-all-auth-own-friend', {
            idAuth: currentAuth?.auth._id,
            token: `Beaer ${token}`
        })

        setAllOwnFriend(allAuth.data.ownFriend)
    }

    useEffect(() => {
        getAllAuthOwnFriend()
    }, [])



    return <div className="AllFriendSidebar">
        <div className="pt"></div>
        <div className="AllFriendSidebar_back">
            <ArrowLeftOutlined onClick={handleBackPage} className='AllFriendSidebar_back_icon' />
            <span>Tất cả bạn bè</span>
        </div>

        <div className="AllFriendSidebar_body">
            {
                allOwnFriend.length === 0 ?
                    <></> :
                    allOwnFriend.map(friend => {
                        return <Link to={`/profile/${friend._id}`} key={friend._id} className="AllFriendSidebar_item">
                            <div className="AllFriendSidebar_item_img">
                                {
                                    friend.avatar !== '' ?
                                        <div style={{ backgroundImage: `url(${friend.avatar})` }}></div> :
                                        <div style={{ backgroundImage: `url(${userEmpty})` }}></div>
                                }
                            </div>
                            <div className="SidebarRequestAddFriend_item_content">
                                <span className="AllFriendSidebar_item_name">{friend.username}</span>
                            </div>
                        </Link>
                    })
            }


        </div>
    </div>
}


const AllFriendInner = () => {
    const { id } = useParams()

    if (id !== undefined) {
        return <div className="AllFriendInner">
            <Profile />
        </div>

    } else {
        return <div className="AllFriendInner">
            <NoProfile />
        </div>
    }
}

export default AllFriend;