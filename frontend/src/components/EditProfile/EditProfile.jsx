import { useEffect, useState } from 'react'
import './EditProfile.scss'
import { updateAvatar, updateCover, updateDesc } from '../../services/api'
import { typeModal } from '../Modal/configModal'

import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux'


function EditProfile({ setVisibleModal }) {

    const dispatch = useDispatch()
    const { currentAuth } = useSelector(state => state.auth)
    const [toggleModal, setToggleModal] = useState(false)
    const [visibleModalDesc, setVisibleModalDesc] = useState(false)
    const [visibleModalInfo, setVisibleModalInfo] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [imgCover, setImgCover] = useState('')
    const [desc, setDesc] = useState(currentAuth.auth.profile.desc)

    useEffect(() => {
        hiddenInputEditDesc()
    }, [])

    const handleCloseModal = () => {
        if (avatar !== '' || imgCover !== '' || desc !== currentAuth.auth.profile.desc) {
            console.log('bjkcs')
            setToggleModal(true)
        } else {
            setVisibleModal(false)
            hiddenInputEditDesc()
        }
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = err => {
                reject(err)
            }
        })
    }

    const changeAvatar = async (event) => {
        const file = event.target.files[0]
        const fileBase64 = await convertToBase64(file)
        const btnSaveAvatar = document.querySelector('.save_avatar')
        btnSaveAvatar.classList.add('active')
        setAvatar(fileBase64)
    }
    const changeImgCover = async (event) => {
        const file = event.target.files[0]
        const fileBase64 = await convertToBase64(file)
        const btnSaveImgCover = document.querySelector('.save_img_cover')
        btnSaveImgCover.classList.add('active')
        setImgCover(fileBase64)
    }

    const handleSaveAvatar = () => {
        const m = updateAvatar(currentAuth.auth._id, avatar, dispatch)
    }

    const handleSaveCover = () => {
        const m = updateCover(currentAuth.auth._id, imgCover, dispatch)
    }

    const disChange = () => {
        const btnSaveAvatar = document.querySelector('.save_avatar')
        btnSaveAvatar.classList.remove('active')
        setAvatar('')
        setImgCover('')
        setToggleModal(false)
        setVisibleModal(false)
    }

    const displayInputEditDesc = () => {
        const ipDesc = document.querySelector('.EditProfile_desc_ip')
        const ipDescEdit = document.querySelector('.EditProfile_desc_ip_edit')
        const btnDesc = document.querySelector('.EditProfile_desc_btn')

        ipDesc.classList.add('hidden')
        ipDescEdit.classList.add('active')
        ipDescEdit.focus()
        btnDesc.classList.add('active')
    }

    const hiddenInputEditDesc = () => {
        const ipDesc = document.querySelector('.EditProfile_desc_ip')
        const ipDescEdit = document.querySelector('.EditProfile_desc_ip_edit')
        const btnDesc = document.querySelector('.EditProfile_desc_btn')

        ipDesc.classList.remove('hidden')
        ipDescEdit.classList.remove('active')
        btnDesc.classList.remove('active')
        setDesc(currentAuth.auth.profile.desc)
    }

    const handleEditDesc = () => {
        displayInputEditDesc()
    }

    const saveDesc = () => {
        const m = updateDesc(currentAuth.auth._id, desc, dispatch)
        console.log(m)
    }


    return <div className="EditProfile">
        <Modal visibleModal={toggleModal} inner={typeModal.exit} option={disChange} />
        <Modal visibleModal={visibleModalDesc} setVisibleModal={setVisibleModalDesc} />
        <Modal visibleModal={visibleModalInfo} setVisibleModal={setVisibleModalInfo} inner={typeModal.editInfo} />
        <div className="EditProfile_head">
            <h2>Chỉnh sửa trang cá nhân</h2>
            <CloseOutlined onClick={handleCloseModal} className='btn_close_edit_profile' />
        </div>

        <div className="EditProfile_avatar">
            <div className="HeadEdit">
                <h2>Ảnh đại diện</h2>
                <label htmlFor="ip_edit">
                    <p >Chỉnh sửa</p>
                    <input onChange={e => changeAvatar(e)} type="file" name="" id="ip_edit" hidden />
                </label>
            </div>
            <div className="EditProfile_avatar_inner">
                <div className="EditProfile_avatar_img">
                    <div style={{ backgroundImage: `url(${avatar || currentAuth.auth.avatar})` }}></div>
                </div>
                <button onClick={handleSaveAvatar} className='btn_save save_avatar'>luu</button>
            </div>
        </div>

        <div className="EditProfile_cover">
            <div className="HeadEdit">
                <h2>Ảnh bìa</h2>
                <label htmlFor="ip_edit_cover_img">
                    <p >Chỉnh sửa</p>
                    <input onChange={e => changeImgCover(e)} type="file" name="" id="ip_edit_cover_img" hidden />
                </label>
            </div>
            <div className="EditProfile_cover_inner">
                <div className="EditProfile_cover_img">
                    <div style={{ backgroundImage: `url(${imgCover || currentAuth.auth.cover})` }}></div>
                </div>
            </div>
            <button onClick={handleSaveCover} className='btn_save save_img_cover'>luu</button>
        </div>

        <div className="EditProfile_desc">
            <div className="HeadEdit">
                <h2>Tiểu sử</h2>
                <p onClick={handleEditDesc}>Chỉnh sửa</p>
            </div>
            <input className='EditProfile_desc_ip' readOnly type="text" name="" id="" value={desc} />
            <input className='EditProfile_desc_ip_edit' onChange={e => setDesc(e.target.value)} type="text" name="" id="" value={desc} />
            <div className="EditProfile_desc_btn active">
                <button onClick={hiddenInputEditDesc} className='EditProfile_desc_btn EditProfile_desc_btn_cancel'>huy</button>
                <button onClick={saveDesc} className='EditProfile_desc_btn EditProfile_desc_btn_save'>Luu</button>
            </div>
        </div>

        <div className="EditProfile_info">
            <HeadEdit title={'Chỉnh sửa phần giới thiệu'} setToggleModal={setVisibleModalInfo} />
            <ItemInfo icon={<ExclamationCircleOutlined />} title={currentAuth.auth.profile.address} />
            <ItemInfo icon={<ExclamationCircleOutlined />} title={currentAuth.auth.profile.school} />
            <ItemInfo icon={<ExclamationCircleOutlined />} title={currentAuth.auth.profile.career} />
            <ItemInfo icon={<ExclamationCircleOutlined />} title={currentAuth.auth.profile.hobby} />
        </div>
    </div>
}

export const ModalExit = ({ onclickExit, onclickClose }) => {
    return <div className="modalexit">
        <h2>Bạn muốn bỏ hết mọi thay đổi ?</h2>
        <div className="modalexit_btn">
            <button onClick={onclickExit} className="modalexit_btn_exit">Bỏ</button>
            <button onClick={onclickClose} className="modalexit_btn_close">Đóng</button>
        </div>
    </div>
}

const HeadEdit = ({ title, setToggleModal, noModal, setImg }) => {
    const handleOpenModal = () => {
        setToggleModal(true)
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = err => {
                reject(err)
            }
        })
    }

    const handleOnchange = async (event) => {
        const file = event.target.files[0]
        const fileBase64 = await convertToBase64(file)
        setImg(fileBase64)
    }

    return <div className="HeadEdit">
        <h2>{title}</h2>
        {noModal ?
            <label htmlFor="ip_edit">
                <p >Chỉnh sửa</p>
                <input onChange={e => handleOnchange(e)} type="file" name="" id="ip_edit" hidden />
            </label> :
            <p onClick={handleOpenModal}>Chỉnh sửa</p>
        }
    </div>
}



const ItemInfo = ({ icon, title }) => {
    return <div className="item_info">
        {icon}
        <p>{title}</p>
    </div>
}

export default EditProfile;