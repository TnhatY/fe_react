import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";

const HomeUser = () => {

    const [user, setUser] = useState(null);

    const showProfile = async () => {
        try {
            let user = await getProfile();

            if (!user || user.status === false) {
                window.location.href = `${window.location.origin}/login`;
                return; // Dừng thực thi tiếp
            }

            setUser(user);
        } catch (error) {
            console.error("Lỗi khi lấy hồ sơ người dùng:", error);
            window.location.href = `${window.location.origin}/login`;
        }
    };

    useEffect(() => {
        if (performance.navigation.type === 2) {
            window.location.reload();
        }
        showProfile()
    }, [])


    if (!user) {
        return <h1>No user data</h1>;
    }

    return (
        <div>
            <img src={decodeURIComponent(user?.avatar)} alt="User Avatar" />

            <h1>Welcome, {user.lastName}!</h1>
            <p>Email: {user.email}</p>
            <p>ID: {user._id}</p>
        </div>
    );
};
export default HomeUser;