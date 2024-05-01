import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../../appwrite/Auth/AuthBlogger';
import { loggedOutSuccess } from '../../app/userSlice';
import { useDispatch } from 'react-redux';

function Navigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if the user is already logged in
        const checkUserLoggedIn = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    // User is not logged in, redirect to login page
                    navigate('/login');
                }
            } catch (error) {
                console.log(`Error checking user login status: ${error}`);
            }
        };

        checkUserLoggedIn();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            // const sessionId = 'current'; // Use 'current' as session ID to logout on this device
            dispatch(loggedOutSuccess());
            await logoutUser();
            // Dispatch loggedOutSuccess action
            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.log(`Error in logging out: ${error}`);
        }
    };

    return (
        <div>
            <header>
                <Nav className="navbar justify-content-center" activeKey="/home">
                    <Nav.Item className="m-2">
                        <Link to="/home" className="nav-link"><h4>Home</h4></Link>
                    </Nav.Item>
                    <Nav.Item className="m-2">
                        <Link to="/blog" className="nav-link"><h4>Blog</h4></Link>
                    </Nav.Item>
                    <Nav.Item className="m-2">
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/account">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                </Nav>
            </header>
            <main className="content with-bg-img">
                <Outlet />
            </main>
        </div>
    );
}

export default Navigation;
