import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { toast } from "sonner";
import { postRegister } from "../../services/api";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [lastName, setLastName] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            console.log('lỗi email')
            toast.error('Email không hợp lệ! Vui lòng nhập đúng định dạng.', { duration: 2000 });
            return;
        }

        if (!passWord) {
            toast.error('Vui lòng nhập password')
            return;
        }
        let res = await postRegister(email, firstName, lastName, passWord);
        if (res) {
            toast.success(res.message)
            //console.log(email, lastName)
            navigate("/login");
        } else {
            toast.error(res.status)
            console.log(res.status)
        }
    }

    return (

        <div classNameName="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Đăng ký</h2>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn"
                            value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">FistName</label>
                        <input type="text" className="form-control" id="username"
                            value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">LastName</label>
                        <input type="text" className="form-control" id="username"
                            value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu"
                            value={passWord} onChange={(event) => setPassWord(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={() => handleRegister()}>Đăng ký</button>

                </div>
            </div>
        </div>
    )
}
export default Register;