import './Login.scss'
import { login } from '../../services/api'


import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function Login() {
    const [inputText, setInputText] = useState({
        email: '',
        password: ''
    })
    const [validate, setValidate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentAuth, message } = useSelector(state => state.auth)


    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)

        if (inputText.email === '') {
            setErrEmail('Yêu cầu nhập email')
            setValidate(false)
            setLoading(false)
        }
        if (inputText.email !== '' && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputText.email) === true) {
            setErrEmail("")
            setLoading(false)
        }
        if (inputText.email !== '' && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputText.email) === false) {
            setErrEmail("Nhập đúng định dạng email")
            setValidate(false)
            setLoading(false)
        }
        if (inputText.password === '') {
            setErrPassword('Yêu cầu nhập tên mật khẩu')
            setValidate(false)
            setLoading(false)
        }
        if (inputText.password !== '' && inputText.email !== '' && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputText.email) === true) {
            setErrPassword('')
            setValidate(true)
            setLoading(false)
        }


        if (validate) {
            login({
                email: inputText.email.trim(),
                password: inputText.password.trim(),
            }, dispatch)
            setLoading(false)
            if (currentAuth === null) {
                toast.error(message)
                return
            } else {
                // document.cookie = 'token=' + currentAuth.token
                navigate('/')
                localStorage.setItem('token', currentAuth?.token)
            }
        }
    }

    return <div className="Login">
        <form onSubmit={event => handleLogin(event)} action="" className="login_inner">
            <BeatLoader
                color={'red'}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <h2 className='login_title' >Đăng nhập</h2>
            <div className="login_input">
                <label htmlFor="">Email</label>
                <input type="email"
                    value={inputText.username}
                    name="username"
                    id="username"
                    onChange={event => setInputText(prev => { return { email: event.target.value, password: prev.password } })}
                />
                <span>{errEmail}</span>
            </div>
            <div className="login_input">
                <label htmlFor="">Mật khẩu</label>
                <input type="password"
                    value={inputText.password}
                    name="password"
                    id="password"
                    onChange={event => setInputText(prev => { return { email: prev.email, password: event.target.value } })}
                />
                <span>{errPassword}</span>
            </div>

            <button className='btn_login' type="submit">Đăng nhập</button>
            <Link to={'/'} className='forgot_password' >Quên mật khẩu?</Link>
            <p className="signup">Nếu chưa có tài khoản hãy <Link to={'/'}>đăng kí</Link></p>
        </form>
    </div>
}

export default Login;