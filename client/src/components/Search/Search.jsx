import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../appwrite/Database/DatabaseServices';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await getAllPosts();
        const filtered = allPosts.filter(
          (post) =>
            post.UserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.Title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchUsersAndPosts();
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <Form className="d-flex">
          <FormControl
            type="text"
            placeholder="Search..."
            className="mr-2"
            size="lg"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button variant="outline-primary" onClick={handleSearch} className=' m-2'>
            Search
          </Button>
        </Form>
      </div>
      <div className="mt-4 text-start">
        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((post) => (
            <Card key={post.$id} className="mb-3" style={{ width: '100%' }}>
              <Card.Body>
                <Card.Header><h3>
              <Link className="text-dark" to={`/profile/${post.userId}`}>{post.UserName}</Link>
            </h3></Card.Header>
                <Card.Title className="mb-2 text-muted">{post.Title}</Card.Title>
                <Card.Text>{post.Blogdata}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
            null
        //   <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
