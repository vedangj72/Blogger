import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postBlog } from '../../appwrite/Database/DatabaseServices';
import { getCurrentUser } from '../../appwrite/Auth/AuthBlogger';

const AddBlog = () => {
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
        <div className="container mt-4">
            <h1 className="text-center">Post a Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" id="title" {...register('title', { required: true })} className="form-control" />
                    {errors.title && <span className="text-danger">Title is required</span>}
                </div>
                {/* <br /> */}
                <div className="col-md-6">
                    <label htmlFor="blogData" className="form-label">Blog Data:</label>
                    <textarea id="blogData" {...register('blogData', { required: true })} className="form-control"></textarea>
                    {errors.blogData && <span className="text-danger">Blog Data is required</span>}
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Post Blog</button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
