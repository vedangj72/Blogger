import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostId } from '../../appwrite/Database/DatabaseServices';
import { Card, Button } from 'react-bootstrap';

function ProfileId() {
  const { id } = useParams();
  const stringId = id.toString();
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getPostId(stringId);
        setUserDetails(userData); // Assuming getPostId returns an array of user objects
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleViewPosts = async () => {
    setShowPosts(true);
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Error fetching user details: {error.message}</p>;
  }

  return (
    <div>
      {userDetails.length > 0 ? (
          <div>
          <div className=' text-start ms-2'>
            <h1>User Profile</h1>
          <p>Number of Posts: {userDetails.length}</p>
          <p>Username: {userDetails[0].UserName}</p>
          <Button variant="primary" onClick={handleViewPosts}>
            View Posts
          </Button>
          </div>
          {showPosts && (
            <div className=' text-start mt-5'>
              <h2>User Posts</h2>
              {userDetails.length > 0 ? (
                userDetails.map((post) => (
                  <Card key={post.id} className="m-3" style={{ width: '100%' }}>
                    <Card.Body>
                      <Card.Header className="text-start">{post.Title}</Card.Header>
                      <Card.Text>{post.Blogdata}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
}

export default ProfileId;
