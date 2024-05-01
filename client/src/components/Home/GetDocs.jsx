import React, { useEffect, useState } from 'react'
import { getPostId } from '../../appwrite/Database/DatabaseServices'
import {useSelector} from 'react-redux'

function GetDocs() {
    const [data, setData] = useState([]);
    const user=useSelector(state=>state.user)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postId="662e674300125cad4ce1"
                const posts = await getPostId(postId);
                setData(posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    console.log(user);
    return (
        <div>
            {/* Render your posts data here */}
            {data.map(post => (
                <div key={post.$id}>
                    <h2>{post.UserName}</h2>
                    <h2>{post.userId}</h2>
                    <h2>{post.Title}</h2>
                    <p>{post.Blogdata}</p>
                </div>
            ))}
        </div>
    );
}

export default GetDocs;
