import { useState } from 'react';
import './EditInfo.scss'
import { updateAddress, updateSchool, updateCareer, updateHobby } from '../../services/api';

import { CloseOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';


function EditInfo() {

    const { currentAuth } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(currentAuth.auth.profile)

    const handleChange = (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.address !== currentAuth.auth.profile.address) {
            updateAddress(currentAuth.auth._id, formData.address, dispatch)
        }
        if (formData.career !== currentAuth.auth.profile.career) {
            updateCareer(currentAuth.auth._id, formData.career, dispatch)
        }
        if (formData.school !== currentAuth.auth.profile.school) {
            updateSchool(currentAuth.auth._id, formData.school, dispatch)
        }
        if (formData.hobby !== currentAuth.auth.profile.hobby) {
            updateHobby(currentAuth.auth._id, formData.hobby, dispatch)
        }

    }

    return <div className="EditInfo">

        <div className="EditInfo_head">
            <h2>Chỉnh sửa chi tiết</h2>
            <CloseOutlined className='btn_close_edit_info' />
        </div>
        <form action="" className="EditInfo_form" onSubmit={e => handleSubmit(e)}>
            <div className="EditInfo_form_item">
                <h2>Tỉnh/Thành phố hiện tại</h2>
                <input onChange={e => handleChange(e)} type="text" name="" id="address" value={formData.address} />
            </div>
            <div className="EditInfo_form_item">
                <h2>Công việc</h2>
                <input onChange={e => handleChange(e)} type="text" name="" id="career" value={formData.career} />
            </div>
            <div className="EditInfo_form_item">
                <h2>Học vấn</h2>
                <input onChange={e => handleChange(e)} type="text" name="" id="school" value={formData.school} />
            </div>
            <div className="EditInfo_form_item">
                <h2>Sở thích</h2>
                <input onChange={e => handleChange(e)} type="text" name="" id="hobby" value={formData.hobby} />
            </div>
            <button type="submit">save</button>
        </form>
    </div>
}

export default EditInfo;