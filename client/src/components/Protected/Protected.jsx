import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loggedInSuccess } from '../../app/userSlice';

function Protected(props) {
  const { Component } = props;
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
//   const User = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    // Dispatching loginSuccess here might not be necessary unless you're updating some state on login success.
    // dispatch(loginSuccess());
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* <h1 className='text-end m-2'>Welcome</h1> */}
          <Component /> 
        </div>
      ) : null}
    </div>
  );
}

export default Protected;
