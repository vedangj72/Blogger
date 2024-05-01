import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../appwrite/Auth/AuthBlogger';

const UserComponent = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>{user.$id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Add more user data as needed */}
                </div>
            )}
        </div>
    );
};

export default UserComponent;
