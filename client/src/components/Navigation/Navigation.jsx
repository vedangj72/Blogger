import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeLogo from "../../assets/Icons/logo home.png";
import PenLogo from "../../assets/Icons/pen logo.jpg";
import SearchLogo from "../../assets/Icons/Search logo.png";
import ProfileLogo from "../../assets/Icons/Profile logo.png";
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../appwrite/Auth/AuthBlogger';

function Navigation() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.log(`Error in logging out: ${error}`);
        }
    };

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                    <Container fluid>
                        <Navbar.Brand>
                            <Link to="/home">
                                <img src={HomeLogo} alt="Home Logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="ms-auto align-items-center">
                                <Nav.Item className="mx-2">
                                    <Link to="/blog"><img src={PenLogo} alt="Blog" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></Link>
                                </Nav.Item>
                                <Nav.Item className="mx-2">
                                    <Link to="/search"><img src={SearchLogo} alt="Search" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></Link>
                                </Nav.Item>
                                <Nav.Item className="mx-2">
                                    <NavDropdown title={<img src={ProfileLogo} alt="Profile" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/account">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Navigation;
