import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUser } from "../../services/api";
import ModalUpdateUser from "./ModalUpdateUser";

const ManagerUser = (props) => {
    const [listUser, setListUser] = useState("");
    const [userUpdate, setUserUpdate] = useState("");
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)

    useEffect(() => {
        fetchListUser();
        //fetchListUserWithPaginate(1);
    }, []);


    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setUserUpdate(user);
    };
    const resetUpdateUser = () => {
        setUserUpdate({})
    }
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res) {
            setListUser(res)
            console.log(res);
        }
        console.log(res);
    }

    return (
        <div>
            <TableUser
                listUser={listUser}
                handleClickBtnUpdate={handleClickBtnUpdate}

            />
            <ModalUpdateUser
                resetUpdateUser={resetUpdateUser}
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                userUpdate={userUpdate} />
        </div>
    )
}

export default ManagerUser;