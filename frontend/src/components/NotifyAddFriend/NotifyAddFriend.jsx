import './NotifyAddFriend.scss'


function NotifyAddFriend({ data, title }) {

    return <div className="NotifyAddFriend">
        <div className="NotifyAddFriend_img">
            <div className="NotifyAddFriend_url_img">
                <div style={{ backgroundImage: `url(${data.avatar})` }}></div>
            </div>
        </div>
        <div className="NotifyAddFriend_inner">
            <div className="NotifyAddFriend_content">
                <span>{data.username}</span> {title}
            </div>
            <div className="NotifyAddFriend_time">
                Bây giờ
            </div>
        </div>
    </div>
}

export default NotifyAddFriend;