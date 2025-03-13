import { useEffect, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getLoginWithGoogle, postLogin, postLogOut } from '../../services/api';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }


    const handleRegister = () => {
        navigate("/register")
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            console.log('lỗi email')
            toast.error('Email không hợp lệ! Vui lòng nhập đúng định dạng.', { duration: 3000 });
            return;
        }
        if (!password) {
            toast.error('Vui lòng nhập password')
            return;
        }
        let res = await postLogin(email, password);
        if (res) {
            toast.success(res.message, { duration: 1000 })
            console.log(res.message)
            navigate("/");
        } else {
            toast.error(res.message, { duration: 2000 })
            console.log(res.message)
        }
    }
    const handleLoginSuccess = () => {
        toast.success('Thành công');
    }

    const handleLoginGoogle = () => {
        getLoginWithGoogle() // Chuyển hướng đến backend
    };
    return (
        <div className='body'>
            <div className="login-container">
                <h3 className="text-center mb-4">Login</h3>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                </div>

                <p className="text-center mt-3">Don't have an account? <a onClick={() => handleRegister()}>Sign up</a></p>

                <div className="d-grid">
                    <button class="google-login" onClick={() => handleLoginGoogle()}>
                        <img src="https://www.google.com/favicon.ico" alt="Google Logo" class="google-icon" />
                        Đăng nhập bằng Google
                    </button>

                    <button type="submit" className="btn btn-primary back-button" onClick={() => handleBack()}>Back</button>
                </div>

            </div>

        </div>

    )
}
export default Login;