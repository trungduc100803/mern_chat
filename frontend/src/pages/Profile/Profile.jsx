import './Profile.scss'
import likePNG from '../../assets/like.png'
import { typeModal } from '../../components/Modal/configModal'
import Modal from '../../components/Modal/Modal'
import noCoverImg from '../../assets/noCover.jpg'
import emptyAvatar from '../../assets/userEmpty.png'
import { getAuthByID, getAllPostForAuth } from '../../services/api'
import { setSuccessAllPost } from '../../redux/postSlice'
import hahaPNG from '../../assets/haha.png'
import heartPNG from '../../assets/heart.png'
import sadPNG from '../../assets/sad.png'


import {
    HomeOutlined, EllipsisOutlined,
    LikeOutlined, CommentOutlined,
    ShareAltOutlined, CoffeeOutlined,
    CiCircleOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Profile() {
    const dispatch = useDispatch()
    const { allPost } = useSelector(state => state.post)
    const [currentProfile, setCurrentProfile] = useState({})
    const [visibleLike, setVisibleLike] = useState(false)
    const [visibleHaha, setVisibleHaha] = useState(false)
    const { currentAuth } = useSelector(state => state.auth)
    const IDCurrentAuth = window.location.href.split('/').pop()

    const [visibleModalEditProfile, setVisibleModalEditProfile] = useState(false)
    const [visibleCreatePost, setVisibleCreatePost] = useState(false)



    useEffect(() => {
        const getAuth = async () => {
            const auth = await getAuthByID(IDCurrentAuth)
            setCurrentProfile(auth)
        }
        getAuth()

        const getAllPost = async () => {
            const posts = await getAllPostForAuth(IDCurrentAuth)
            dispatch(setSuccessAllPost(posts))
        }
        getAllPost()

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
                {
                    allPost !== null &&
                    allPost.map((post, i) => {

                        const numEmotion = post.emotion.like.length + post.emotion.haha.length + post.emotion.love.length + post.emotion.sad.length
                        const handleClickLike = (event) => {
                            const element = event.target.className
                            if(element === 'Profile_inner_content_btn_emotion_like_no_active'){
                                const likeNo = event.target
                                const liked = event.target.nextElementSibling
    
                                likeNo.classList.add('hide')
                                liked.classList.add('active')
                            }
                        }


                        const handleCancelLike = (event) => {

                            const likeNo = event.target.previousElementSibling
                            const liked = event.target

                            likeNo.classList.remove('hide')
                            liked.classList.remove('active')
                        }

                        const handClickLikeMore = (event) => {
                            console.log(event.target.parentElement.previousSibling.children[0].className)
                            const like = event.target.parentElement.previousSibling.children[0]

                            if(like.className === 'Profile_inner_content_btn_emotion_like_no_active'){
                                like.classList.add('hide')
                            }else{
                                
                            }
                        }


                        return <div key={post._id} className="Profile_inner_content_item">
                            <div className="Profile_inner_content_head">
                                <div className="Profile_inner_content_head_left">
                                    <div className="Profile_inner_content_avatar">
                                        <div className="Profile_inner_content_avatar_img">
                                            <div style={{ backgroundImage: `url(${currentProfile?.auth?.avatar})` }}></div>
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
                                <div className="Profile_inner_content_body_caption">{post.contentText}</div>

                                <div className="Profile_inner_content_body_list_img">
                                    <div style={{ backgroundImage: `url(${post.file[0]})` }}></div>
                                </div>
                            </div>

                            <div className="Profile_inner_content_status">
                                <img src={likePNG} alt="" />
                                <div className="Profile_inner_content_status_number">{numEmotion}</div>
                            </div>

                            <div className="Profile_inner_content_btn">
                                <button className='Profile_inner_content_btn_emotion'>
                                    <div className='Profile_inner_content_btn_emotion_like' >
                                        <div className={`Profile_inner_content_btn_emotion_like_no_active`} onClick={e => handleClickLike(e)}>
                                            <LikeOutlined /> Thích
                                        </div>
                                        <img className={ 'Profile_inner_content_btn_emotion_liked ' } src={likePNG} onClick={e => handleCancelLike(e)} alt="" />
                                        {/* <img src={hahaPNG} onClick={handlehaha} alt="" className={ visibleHaha ?'Profile_inner_content_btn_emotion_haha active' :'Profile_inner_content_btn_emotion_haha'}/> */}
                                        {/* <img src={heartPNG} alt="" className=''/>
                                        <img src={sadPNG} alt="" /> */}
                                    </div>

                                    <div className="Profile_inner_content_btn_emotion_option">
                                        <img src={likePNG} alt="" onClick={e => handClickLikeMore(e)}/>
                                        <img src={hahaPNG} alt="" />
                                        <img src={heartPNG} alt="" />
                                        <img src={sadPNG} alt="" />
                                    </div>
                                </button>
                                <button className='Profile_inner_content_btn_comment'>
                                    <CommentOutlined /> Bình luận
                                </button>
                                <button className='Profile_inner_content_btn_share'>
                                    <ShareAltOutlined /> Chia sẻ
                                </button>
                            </div>

                            <div className="Profile_inner_content_comment">
                                <div className="Profile_inner_content_comment_avatar">
                                    <div className="Profile_inner_content_comment_avatar_img">
                                        <div style={{ backgroundImage: `url(${currentAuth.auth.avatar})` }}></div>
                                    </div>
                                </div>

                                <div className="Profile_inner_content_comment_input">
                                    <input className='Profile_inner_content_comment_ip_text' placeholder='Viết bình luận ...' type="text" name="" id="" />

                                    <CiCircleOutlined />
                                    <CoffeeOutlined />
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default Profile;