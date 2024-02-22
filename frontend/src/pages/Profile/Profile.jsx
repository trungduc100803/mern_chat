import './Profile.scss'
import likePNG from '../../assets/like.png'
import { typeModal } from '../../components/Modal/configModal'
import Modal from '../../components/Modal/Modal'
import noCoverImg from '../../assets/noCover.jpg'
import emptyAvatar from '../../assets/userEmpty.png'
import { getAuthByID } from '../../services/api'

import {
    HomeOutlined, EllipsisOutlined,
    LikeOutlined, CommentOutlined,
    ShareAltOutlined, CoffeeOutlined,
    CiCircleOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Image } from 'antd'

function Profile() {

    const IDCurrentAuth = window.location.href.split('/').pop()
    const [visibleModalEditProfile, setVisibleModalEditProfile] = useState(false)
    const [visibleCreatePost, setVisibleCreatePost] = useState(false)
    const [currentProfile, setCurrentProfile] = useState({})
    const { currentAuth } = useSelector(state => state.auth)

    useEffect(() => {
        const getAuth = async () => {
            const auth = await getAuthByID(IDCurrentAuth)
            setCurrentProfile(auth)
        }
        getAuth()
    }, [])



    const handleVisibleModalEditProfile = () => {
        setVisibleModalEditProfile(true)
    }

    const handleVisibleCreatePost = () => {
        setVisibleCreatePost(true)
    }

    return <div className="Profile">
        <Modal visibleModal={visibleCreatePost} setVisibleModal={setVisibleCreatePost} inner={typeModal.createPost} />
        <Modal visibleModal={visibleModalEditProfile} setVisibleModal={setVisibleModalEditProfile} inner={typeModal.editProfile} />
        <div className="Profile_head">
            <div className="Profile_cover">
                {
                    currentProfile?.cover === "" ?
                        <div className="Profile_cover_img" style={{ backgroundImage: `url(${noCoverImg})` }}></div>
                        :
                        <div className="Profile_cover_img" style={{ backgroundImage: `url(${currentProfile?.cover})` }}></div>
                }
            </div>

            <div className="Profile_avatar_group">
                <div className="Profile_avatar">
                    {
                        currentProfile.avatar === "" ?
                            <div className="Profile_avatar_img" style={{ backgroundImage: `url(${emptyAvatar})` }}></div> :
                            <div className="Profile_avatar_img" style={{ backgroundImage: `url(${currentProfile.avatar})` }}></div>
                        // <Image className="Profile_avatar_img" src={currentAuth.auth.avatar} />
                    }
                </div>
                <span>{currentProfile.username}</span>

                {window.location.href.includes('/me/profile') ?
                    <div className="Profile_group_btn">
                        <button onClick={handleVisibleModalEditProfile} className='btn_edit_profile'>Chỉnh sửa</button>
                        <button onClick={handleVisibleCreatePost} className='btn_create_post_profile'>Tạo bài viết</button>
                    </div> :
                    currentAuth.auth.frienned.includes(currentProfile._id) ?
                        <div className="Profile_group_btn">
                            <button className='btn_accept_friend'>Hủy kết bạn</button>
                            <button className='btn_send_message'>Nhắn tin</button>
                        </div>
                        :
                        <div className="Profile_group_btn">
                            <button className='btn_accept_friend'>Chấp nhận lời mời</button>
                            <button className='btn_send_message'>Nhắn tin</button>
                        </div>
                }
            </div>
        </div>


        <div className="Profile_inner">
            <div className="Profile_inner_info">
                <div className="Profile_inner_info_intro">
                    <h2>Giới thiệu</h2>
                    <span className='Profile_inner_info_intro_des'>{currentProfile.profile?.desc}</span>

                    <div className="Profile_inner_info_item">
                        <HomeOutlined className='Profile_inner_info_item_icon' />
                        <span>Sống tại <span className='Profile_inner_info_item_bold' >{currentProfile.profile?.address}</span></span>
                    </div>
                    <div className="Profile_inner_info_item">
                        <HomeOutlined className='Profile_inner_info_item_icon' />
                        <span className='Profile_inner_info_item_bold' >{currentProfile.profile?.career}</span>
                    </div>
                    <div className="Profile_inner_info_item">
                        <HomeOutlined className='Profile_inner_info_item_icon' />
                        <span>Học tại <span className='Profile_inner_info_item_bold' >{currentProfile.profile?.school}</span></span>
                    </div>
                    <div className="Profile_inner_info_item">
                        <HomeOutlined className='Profile_inner_info_item_icon' />
                        <span>Sở thích <span className='Profile_inner_info_item_bold' >{currentProfile.profile?.hobby}</span></span>
                    </div>
                </div>
            </div>

            <div className="Profile_inner_content">
                <div className="Profile_inner_content_item">
                    <div className="Profile_inner_content_head">
                        <div className="Profile_inner_content_head_left">
                            <div className="Profile_inner_content_avatar">
                                <div className="Profile_inner_content_avatar_img">
                                    <div style={{ backgroundImage: `url(data:image/jpeg;base64,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)` }}></div>
                                </div>
                            </div>

                            <div className="Profile_inner_content_item_info">
                                <div className="Profile_inner_content_item_name">Trung duc</div>
                                <div className="Profile_inner_content_item_timeUp">4 day</div>
                            </div>
                        </div>

                        <EllipsisOutlined className='Profile_inner_content_item_more' />
                    </div>

                    <div className="Profile_inner_content_body">
                        <div className="Profile_inner_content_body_caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloremque, commodi maiores sequi, repellat itaque recusandae accusamus nostrum reprehenderit, iure voluptatum alias quae! Ipsam cumque nobis pariatur natus aliquid consequuntur.</div>

                        <div className="Profile_inner_content_body_list_img">
                            <div style={{ backgroundImage: `url(https://www.elleman.vn/wp-content/uploads/2020/10/12/186795/ca-si-thai-vu-elle-man-1.jpg)` }}></div>
                        </div>
                    </div>

                    <div className="Profile_inner_content_status">
                        <img src={likePNG} alt="" />
                        <div className="Profile_inner_content_status_number">2</div>
                    </div>

                    <div className="Profile_inner_content_btn">
                        <button className='Profile_inner_content_btn_emotion'>
                            <LikeOutlined /> Thích
                        </button>
                        <button className='Profile_inner_content_btn_comment'><CommentOutlined /> Bình luận</button>
                        <button className='Profile_inner_content_btn_share'><ShareAltOutlined /> Chia sẻ</button>
                    </div>

                    <div className="Profile_inner_content_comment">
                        <div className="Profile_inner_content_comment_avatar">
                            <div className="Profile_inner_content_comment_avatar_img">
                                <div style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YL7Pse4BcOi6_eYM5h46jvjmCPjUk-eGDg&usqp=CAU)` }}></div>
                            </div>
                        </div>

                        <div className="Profile_inner_content_comment_input">
                            <input className='Profile_inner_content_comment_ip_text' placeholder='Viết bình luận ...' type="text" name="" id="" />

                            <CiCircleOutlined />
                            <CoffeeOutlined />
                        </div>
                    </div>
                </div>
                <div className="Profile_inner_content_item">
                    <div className="Profile_inner_content_head">
                        <div className="Profile_inner_content_head_left">
                            <div className="Profile_inner_content_avatar">
                                <div className="Profile_inner_content_avatar_img">
                                    <div style={{ backgroundImage: `url(data:image/jpeg;base64,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)` }}></div>
                                </div>
                            </div>

                            <div className="Profile_inner_content_item_info">
                                <div className="Profile_inner_content_item_name">Trung duc</div>
                                <div className="Profile_inner_content_item_timeUp">4 day</div>
                            </div>
                        </div>

                        <EllipsisOutlined className='Profile_inner_content_item_more' />
                    </div>

                    <div className="Profile_inner_content_body">
                        <div className="Profile_inner_content_body_caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloremque, commodi maiores sequi, repellat itaque recusandae accusamus nostrum reprehenderit, iure voluptatum alias quae! Ipsam cumque nobis pariatur natus aliquid consequuntur.</div>

                        <div className="Profile_inner_content_body_list_img">
                            <div style={{ backgroundImage: `url(https://www.elleman.vn/wp-content/uploads/2020/10/12/186795/ca-si-thai-vu-elle-man-1.jpg)` }}></div>
                        </div>
                    </div>

                    <div className="Profile_inner_content_status">
                        <img src={likePNG} alt="" />
                        <div className="Profile_inner_content_status_number">2</div>
                    </div>

                    <div className="Profile_inner_content_btn">
                        <button className='Profile_inner_content_btn_emotion'>
                            <LikeOutlined /> Thích
                        </button>
                        <button className='Profile_inner_content_btn_comment'><CommentOutlined /> Bình luận</button>
                        <button className='Profile_inner_content_btn_share'><ShareAltOutlined /> Chia sẻ</button>
                    </div>

                    <div className="Profile_inner_content_comment">
                        <div className="Profile_inner_content_comment_avatar">
                            <div className="Profile_inner_content_comment_avatar_img">
                                <div style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YL7Pse4BcOi6_eYM5h46jvjmCPjUk-eGDg&usqp=CAU)` }}></div>
                            </div>
                        </div>

                        <div className="Profile_inner_content_comment_input">
                            <input className='Profile_inner_content_comment_ip_text' placeholder='Viết bình luận ...' type="text" name="" id="" />

                            <CiCircleOutlined />
                            <CoffeeOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Profile;