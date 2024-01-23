import './Discovery.scss'
import DiscoveryLayout from '../../layouts/DiscoveryLayout';
import Card from '../../components/Card/Card';


import { Link } from 'react-router-dom';
import { Flex } from 'antd'
import { UserAddOutlined, UserSwitchOutlined, UserOutlined } from '@ant-design/icons'

function Discovery() {
    return <div className="Discovery">
        <DiscoveryLayout sidebar={<SidebarDiscovery />} inner={<InnerDiscovery />} />
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


const InnerDiscovery = () => {
    return <Flex wrap='wrap' gap="large" className="innerDiscovery">
        <div className="innerDiscovery_item">
            <Card />
        </div>
    </Flex>
}

export default Discovery;