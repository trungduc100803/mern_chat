import './NoProfile.scss'
import noProfile from '../../assets/noProfile.png'

function NoProfile() {
    return <div className="NoProfile">
        <div className="NoProfile_inner">
            <img src={noProfile} alt="" />
            <p>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</p>
        </div>
    </div>
}

export default NoProfile;