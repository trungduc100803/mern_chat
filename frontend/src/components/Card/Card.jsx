import './Card.scss'
import emptyUser from '../../assets/userEmpty.png'

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card({ data, handleClickBtn1, handleClickBtn2, statusBtn, handleClickCancelFriend }) {

    return <div className="card">
        <Link to={`/profile/${data?._id}`} className="card_img" >
            {
                data.avatar !== '' ?
                    <div style={{ backgroundImage: `url(${data.avatar})` }}></div> :
                    <div style={{ backgroundImage: `url(${emptyUser})` }}></div>
            }
        </Link>
        <div className="card_content">
            <span className="card_name">{data.username}</span>
            <span className='friend_own'></span>
            {
                statusBtn !== undefined ?
                    statusBtn.some(friend => friend === data._id) ?
                        <button onClick={handleClickCancelFriend} className='card_btn_ok'>Hủy lời mời</button> :
                        <button onClick={handleClickBtn1} className='card_btn_ok'>Kết bạn</button> :
                    <button onClick={handleClickBtn1} className='card_btn_ok'>Kết bạn</button>
            }
            <button onClick={handleClickBtn2} className='card_btn_delete'>Xóa</button>
        </div>
    </div>
}

export default Card;