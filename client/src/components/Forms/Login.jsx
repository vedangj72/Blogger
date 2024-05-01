import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../appwrite/Auth/AuthBlogger";
import { Link, useNavigate } from "react-router-dom";
import { loggedInSuccess } from "../../app/userSlice";
import "./LoginForm.css"; // Import external CSS file for styling

const LoginForm = () => {
  const { register, handleSubmit,reset } = useForm();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (data) => {
    try {
      await loginUser(data.email, data.password);
      dispatch(loggedInSuccess({ email: data.email }));
      alert("Login successful!");
      navigate("/home");
      reset();
      // setIsLoggedIn(true);
      // Additional logic after successful login, such as redirecting to another page
    } catch (error) {
      console.error("Error logging in user:", error);
      // Handle login error, such as displaying an error message to the user
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className=" btn btn-primary ">Login</button>
          </div>
          <div>
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
