import DiscoveryLayout from '../../layouts/DiscoveryLayout';
import './RequestAddFriend.scss'
import Profile from '../Profile/Profile';


import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import NoProfile from '../../components/NoProfile/NoProfile';

function RequestAddFriend() {
    return <div className="RequestAddFriend">
        <DiscoveryLayout sidebar={<SidebarRequestAddFriend />} inner={<InnerRequestAddFriend />} />
    </div>
}


const SidebarRequestAddFriend = () => {

    const handleBackPage = () => {
        window.history.back()
    }

    return <div className="SidebarRequestAddFriend">
        <div className="pt"></div>
        <div className="SidebarRequestAddFriend_back">
            <ArrowLeftOutlined onClick={handleBackPage} className='SidebarRequestAddFriend_back_icon' />
            <span>Lời mời kết bạn</span>
        </div>

        <div className="SidebarRequestAddFriend_body">
            <div className="SidebarRequestAddFriend_body_numFriend">88 lời mời kết bạn</div>
            <Link to={'/profile/isa8789dhsg'} className="SidebarRequestAddFriend_item">
                <div className="SidebarRequestAddFriend_item_img">
                    <div style={{ backgroundImage: `url(data:image/jpeg;base64,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)` }}></div>
                </div>
                <div className="SidebarRequestAddFriend_item_content">
                    <span className="SidebarRequestAddFriend_item_name">Trung duc</span>
                    <div className="SidebarRequestAddFriend_item_btn">
                        <button className='SidebarRequestAddFriend_item_btnOK'>Xác nhận</button>
                        <button className='SidebarRequestAddFriend_item_btnDelete'>Xóa</button>
                    </div>
                </div>

                <div className="SidebarRequestAddFriend_item_time">1 day</div>
            </Link>
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