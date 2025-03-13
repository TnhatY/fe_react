import { Outlet } from "react-router-dom";
import Header from "./Header";

const HomePage = (props) => {
    return (
        <div>

            <div>
                <Header />
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default HomePage;