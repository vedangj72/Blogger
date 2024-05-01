import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postBlog } from '../../appwrite/Database/DatabaseServices';
import { getCurrentUser } from '../../appwrite/Auth/AuthBlogger';

const BlogPostForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const onSubmit = async (formData) => {
        try {
            const blogData = {
                Title: formData.title,
                Blogdata: formData.blogData,
                userId: currentUser ? currentUser.$id : null,
                UserName: currentUser ? currentUser.name : null
            };
            const response = await postBlog(blogData);
            console.log(response); // Handle the response as needed
            alert('Blog posted successfully');
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error('Error posting blog:', error);
            // Show error message using toast notification library or similar
        }
    };

    return (
        <div>
            <h1>Post a Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Title:
                    <input type="text" {...register('title', { required: true })} />
                    {errors.title && <span>Title is required</span>}
                </label>
                <br />
                <label>
                    Blog Data:
                    <textarea {...register('blogData', { required: true })}></textarea>
                    {errors.blogData && <span>Blog Data is required</span>}
                </label>
                <br />
                <button type="submit">Post Blog</button>
            </form>
        </div>
    );
};

export default BlogPostForm;
