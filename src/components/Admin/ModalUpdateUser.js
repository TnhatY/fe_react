import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import './ManageUsser.scss';
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'sonner';
//import { putUpdateUser } from '../../services/apiService';
import _ from 'lodash';
const ModalUpdateUser = (props) => {
    const { show, setShow, userUpdate, resetUpdateUser } = props

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        resetUpdateUser();

    };


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage("");
        }
    }

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            setEmail(userUpdate.email)
            setPassword(userUpdate.password)
            setUsername(userUpdate.username)
            if (userUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${userUpdate.image}`)
            }
        }
    }, [userUpdate])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submitUpdateUser = async () => {
        //validate
        if (!validateEmail(email)) {
            toast.error('Email không hợp lệ! Vui lòng nhập đúng định dạng.', { duration: 3000 });
            return;
        }

        if (!username) {
            toast.error('Vui lòng nhập username')
            return;
        }

        //submit data
        // let data = await putUpdateUser(userUpdate.id, username, role, image)
        // if (data && data.EC === 0) {
        //     toast.success('Cập nhật thông tin thành công!');
        //     handleClose();
        //     await props.fetchListUser(props.currentPage);
        // }
        // else {
        //     toast.error(data.EM)
        // }
    }

    //console.log(userUpdate)

    return (
        <div>
            {/* Đảm bảo thêm type="button" */}


            <Modal show={show} onHide={handleClose} backdrop='static' className='modal-create-user' >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} disabled onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} disabled onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
                            <input type="text" className="form-control" name='userName' value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select id="inputState" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="uploadFile" htmlFor='uploadFile' ><IoIosAddCircle /> Upload image file</label>
                            <input type="file" hidden id='uploadFile' onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview" >
                            {previewImage ?
                                <img src={previewImage} /> :
                                <span>PreviewImage</span>}
                        </div>


                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => submitUpdateUser()}>

                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalUpdateUser;