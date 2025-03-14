import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Admin/HomePage';
import App from './App';
import ManagerUser from './components/Admin/ManagerUser';
import Login from './components/Auth/Login';
import HomeUser from './components/User/HomeUser';
import Register from './components/Auth/Register';
import Message from './components/Admin/Message';
const Router = () => {
    return (<>
        <Routes>
            <Route path='/' element={<HomePage />}>
                <Route index element={<ManagerUser />}></Route>
                <Route path='/profile' element={<HomeUser />}></Route>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>

            <Route path='/register' element={<Register />}>
            </Route>
            <Route path='/chat' element={<Message />}>
            </Route>

        </Routes>
    </>


    )
}

export default Router;