import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../appwrite/Database/DatabaseServices';
import { Link } from 'react-router-dom';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getAllPosts();
        const sortedData = data.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        setUserData(sortedData);
        initializeLikeDislikeCounts(sortedData);
      } catch (error) {
        console.log(`Error in loading and fetching the data: ${error}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const initializeLikeDislikeCounts = (data) => {
    const initialLikeCounts = {};
    const initialDislikeCounts = {};
    data.forEach((post) => {
      initialLikeCounts[post.$id] = 0;
      initialDislikeCounts[post.$id] = 0;
    });
    setLikeCounts(initialLikeCounts);
    setDislikeCounts(initialDislikeCounts);
  };

  const handleReadMore = (postId) => {
    setExpandedCardId(postId);
  };

  const handleClose = () => {
    setExpandedCardId(null);
  };

  const handleLikeDislike = (postId, action) => {
    if (action === 'like') {
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [postId]: prevCounts[postId] + 1,
      }));
    } else if (action === 'dislike') {
      setDislikeCounts((prevCounts) => ({
        ...prevCounts,
        [postId]: prevCounts[postId] + 1,
      }));
    }
  };

  if (loading) {
    return <h1 className='text-center'>Loading...</h1>;
  }

  if (error) {
    return <h1 className='text-center text-danger'>Error in fetching the data</h1>;
  }

  return (
    <div className="container mt-4">
      {userData.map((post) => (
        <Card className="mb-3" key={post.$id}>
          <Card.Body>
            <Card.Header className='text-start ' onClick={() => handleReadMore(post.$id)}>
              {/* <h3 className='text-start'>{post.UserName}</h3> */}
              <h3>
              <Link className="text-dark" to={`/profile/${post.userId}`}>{post.UserName}</Link>
            </h3>
            {/* <br /> */}
              <small className="text-muted">{formatDate(post.$createdAt)}</small>
            </Card.Header>
            <Card.Title className='text-start'>{post.Title}</Card.Title>
            {expandedCardId === post.$id ? (
              <>
                <Card.Text className='text-start'>{post.Blogdata}</Card.Text>
                <Button variant="danger" onClick={handleClose}>Close</Button>
              </>
            ) : (
              <Card.Text className='text-start'>{`${post.Blogdata.substring(0, 10)}...`}</Card.Text>
            )}
            {/* Uncomment the following section if you want to include like and dislike buttons */}
            {/* <ButtonGroup aria-label="Like Dislike" className="like-dislike-group">
              <Button variant="success" onClick={() => handleLikeDislike(post.$id, 'like')}>
                <i className="bi bi-hand-thumbs-up-fill"></i>{likeCounts[post.$id]}
              </Button>
              <Button variant="danger" onClick={() => handleLikeDislike(post.$id, 'dislike')}>
                <i className="bi bi-hand-thumbs-down-fill"></i> {dislikeCounts[post.$id]}
              </Button>
            </ButtonGroup> */}
            {expandedCardId !== post.$id && (
              <Button variant="primary" onClick={() => handleReadMore(post.$id)}>Read More</Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default Home;
