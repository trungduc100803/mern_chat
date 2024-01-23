import './Card.scss'


function Card() {
    return <div className="card">
        <div className="card_img" >
            <div style={{ backgroundImage: `url(data:image/jpeg;base64,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)` }}></div>
        </div>
        <div className="card_content">
            <span className="card_name">Trung duc</span>
            <span className='friend_own'></span>
            <button className='card_btn_ok'>Xác nhận</button>
            <button className='card_btn_delete'>Xóa</button>
        </div>
    </div>
}

export default Card;