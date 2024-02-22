import './Discovery.scss'
import DiscoveryLayout from '../../layouts/DiscoveryLayout';
import Card from '../../components/Card/Card';
import { getAllAuthNotMeAndOwnFriend, addFriend, cancelFriend, getAllAuth } from '../../services/api';
import socket from '../../config/socketIO';

import { Link } from 'react-router-dom';
import { Flex } from 'antd'
import { UserAddOutlined, UserSwitchOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Discovery() {
    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)
    const { friendsSuggest } = useSelector(state => state.friend)
    useEffect(() => {
        getAllAuthNotMeAndOwnFriend(currentAuth.auth._id, dispatch)
    }, [])


    return <div className="Discovery">
        <DiscoveryLayout sidebar={<SidebarDiscovery />} inner={<InnerDiscovery friendsSuggest={friendsSuggest} />} />
    </div>
}

const SidebarDiscovery = () => {
    return <div className="sidebarDiscovery">
        <div className="pt"></div>
        <Link to={'/discovery'} className='sidebarDiscovery_item active'>
            <UserAddOutlined className='sidebarDiscovery_icon' />
            <p>Gợi ý</p>
        </Link>
        <Link to={'/discovery/request-add-friend'} className='sidebarDiscovery_item'>
            <UserSwitchOutlined className='sidebarDiscovery_icon' />
            <p>Lời mời kết bạn</p>
        </Link>
        <Link to={'/discovery/all-friend'} className='sidebarDiscovery_item'>
            <UserOutlined className='sidebarDiscovery_icon' />
            <p>Tất cả bạn bè</p>
        </Link>

    </div>
}


const InnerDiscovery = ({ friendsSuggest }) => {

    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)


    return <Flex wrap='wrap' gap="large" className="innerDiscovery">
        {
            friendsSuggest !== null ?
                friendsSuggest.map((friend) => {

                    const handleAddFriend = () => {
                        const dataEmit = {
                            from: currentAuth.auth._id,
                            to: friend._id
                        }
                        const addFriendMethod = () => {
                            addFriend(dataEmit.from, dataEmit.to, dispatch)
                        }
                        socket.emit('add-friend', dataEmit, addFriendMethod)
                    }

                    const handleClickCancelFriend = () => {
                        cancelFriend(currentAuth.auth._id, friend._id, dispatch)
                    }

                    return <div key={friend._id} className="innerDiscovery_item">
                        <Card data={friend} handleClickBtn1={handleAddFriend} handleClickCancelFriend={handleClickCancelFriend} statusBtn={currentAuth.auth.FriendsHaveSentFriendRequests} />
                    </div>
                }) :
                <></>
        }

    </Flex>
}

export default Discovery;