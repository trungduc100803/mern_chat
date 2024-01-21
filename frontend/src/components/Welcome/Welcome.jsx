import './Welcome.scss'
import no_message from '../../assets/no_message.webp'


function Welcome() {
    return <div className="Welcome">
        <img className='img_no_message' src={no_message} alt="" />
    </div>
}

export default Welcome;