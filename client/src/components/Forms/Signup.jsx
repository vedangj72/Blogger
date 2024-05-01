import React from 'react';
import { useForm } from 'react-hook-form';
import { signUpUser } from '../../appwrite/Auth/AuthBlogger';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggedInSuccess } from '../../app/userSlice';
import './SignUpForm.css'; 
import { Link } from 'react-router-dom';

function Signup() {
    const { register, handleSubmit,reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await signUpUser(data.email, data.password, data.name,data.phone);
            dispatch(loggedInSuccess({ email: data.email }));
            alert(`Signup successful for ${data.name}`);
            navigate('/home');
            console.log('User signed up successfully:', response);
            reset();
            // Handle success (e.g., redirect to dashboard, show success message)
        } catch (error) {
            console.error('Error signing up user:', error);
            // Handle error (e.g., display error message to user)
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("name", { required: true })} placeholder="Name" />
                    <input type="email" {...register("email", { required: true })} placeholder="Email" />
                    <input type="password" {...register("password", { required: true })} placeholder="Password" />
                    <input type="text" {...register("phone", { required: true })} placeholder="Phone Number" />
                    <button type="submit">Sign Up</button>
                    <div>
                      Already have a account ?
                      <Link to={"/login"}> login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
