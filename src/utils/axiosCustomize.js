import axios from "axios";
import { toast } from "sonner";

const instance = axios.create({
    baseURL: 'http://localhost:8089/',
    withCredentials: true, // Gửi cookie khi request
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = [];
};

instance.interceptors.response.use(
    (response) => response && response.data ? response.data : response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response?.data?.refresh) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push(() => {
                        resolve(instance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                let res = await axios.post("http://localhost:8089/auth/refresh", {}, { withCredentials: true });
                if (res) {
                    console.log(res.data.message)
                }
                onRefreshed(); // Gửi lại các request đang chờ
                return instance(originalRequest); // Gửi lại request bị lỗi
            } catch (err) {
                console.error("Refresh Token Expired!", err);
                window.location.href = "/login"; // Chuyển hướng đăng nhập
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        if (error.response.status === 403) {
            console.warn("Bạn không có quyền truy cập tài nguyên này!");
            toast.warning("Bạn không có quyền truy cập tài nguyên này!"); // Hiển thị thông báo
            return null; // Trả về `null` để tránh crash ứng dụng
        }

        return Promise.reject(error);
    }
);

export default instance;
