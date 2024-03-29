import {  useState } from 'react';
import './CreatePost.scss'
import { convertToBase64 } from '../../utils';
import { createPost} from '../../services/api';
import { addPost } from '../../redux/postSlice';

import { CloseOutlined, FileImageOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
function CreatePost({ setVisibleModal }) {

    const dispatch = useDispatch()
    const {currentAuth} = useSelector(state => state.auth)
    const [visibleAddFile, setVisibleAddFile] = useState(false)
    const [filePost, setFilePost] = useState([])
    const [contentText, setContentText] = useState('')


    const handleSelectImg =async (event ) => {
        const file = event.target.files[0]
        const fileBase64 = await convertToBase64(file)
        setFilePost(filePrev => {return [...filePrev, fileBase64]})
    }

    const handleSubmitCreatePost =async (e) => {
        e.preventDefault()
        if(contentText === '' && filePost.length === 0){
            console.log('no')
        }else{
            const data = {
                contentText,
                file: filePost
            }
            const post = await createPost(currentAuth.auth._id, data)
            dispatch(addPost(post))
            setVisibleModal(false)
            setFilePost([])
            setContentText('')
        }

    }

    return <div className="CreatePost">
        <div className="CreatePost_head">
            <h2>Tạo bài viết</h2>
            <CloseOutlined onClick={() => setVisibleModal(false)} className='btn_close_create_post' />
        </div>

        <form onSubmit={handleSubmitCreatePost} className="CreatePost_body">
            <div className="CreatePost_user">
                <div className="CreatePost_user_avatar">
                    <div style={{ backgroundImage: `url(data:image/jpeg;base64,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)` }}></div>
                </div>
                <div className="CreatePost_user_name">Trung duc</div>
            </div>

            <div className="CreatePost_setContent">
                <textarea onChange={e => setContentText(e.target.value)} type="text" placeholder='Nhập nội dung...' name="" id="" className="CreatePost_setContent_text" />

                <div className={visibleAddFile ? 'CreatePost_setContent_file active' : 'CreatePost_setContent_file'}>
                    <div className="CreatePost_setContent_file_body">
                        <CloseOutlined className='CreatePost_setContent_file_btn_close' onClick={() => setVisibleAddFile(false)} />
                        <label htmlFor="addFileCreatePost" >
                            <div>
                                <FileImageOutlined className='CreatePost_setContent_file_btn' />
                                <h2>Thêm ảnh, video</h2>
                            </div>
                        </label>
                        <input type="file" onChange={e => handleSelectImg(e)} name="" multiple id="addFileCreatePost" hidden />
                    </div>
                    <div className="CreatePost_setContent_file_preview">
                        
                            {
                                filePost.length > 0 && filePost.map((file, i) => {
                                    return <div key={i} className="CreatePost_setContent_file_item">
                                                <div 
                                                    style={{backgroundImage: `url(${file})`}}
                                                    ></div>
                                        </div>
                                })
                            }
                        
                    </div>
                </div>
            </div>

            <div className="CreatePost_more">
                <h2>Thêm vào bài viết</h2>

                <div className="CreatePost_more_options">
                    <FileImageOutlined onClick={() => setVisibleAddFile(true)} className='CreatePost_more_item' />
                </div>
            </div>

            <button type="submit" className='CreatePost_submit'>Đăng</button>
        </form>
    </div>
}

export default CreatePost;