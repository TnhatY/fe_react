import axios from '../utils/axiosCustomize';


export const getAllUser = async () => {
    return await axios.get('')
}

export const postLogin = async (email, passWord) => {
    return await axios.post(`login`, { email, passWord })
}

export const getProfile = async () => {
    return await axios.get('profile')
}

export const postLogOut = async () => {
    return await axios.post('logout')
}

export const postRegister = async (email, firstName, lastName, passWord) => {
    return await axios.post('register', { email, firstName, lastName, passWord })
}

export const getLoginWithGoogle = () => {
    return window.location.href = "https://be-mongodb.onrender.com/auth/google";
}

export const getMessage = async (receiverId) => {
    return await axios.post('message', { receiverId })
}