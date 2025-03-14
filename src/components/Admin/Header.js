import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("https://be-mongodb.onrender.com/logout", {}, {
                withCredentials: true // Cho phép gửi cookie
            });

            if (response) {
                // localStorage.removeItem("user"); // Xóa thông tin user khỏi localStorage
                window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
            } else {
                console.log("Logout failed:");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='/' className='navbar-brand'>React</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/' className='nav-link'>Admin</NavLink>
                        <NavLink to='/profile' className='nav-link'>User</NavLink>
                        {/*                     
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}

                    </Nav>
                    <Nav>
                        <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                        <button className='btn-signup'>Sign up</button>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >
                                <NavLink to='/profile' className='nav-link' >Profile</NavLink>

                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Log In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >
                                <button onClick={() => handleLogout()}>Log Out</button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;