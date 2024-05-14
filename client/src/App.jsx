import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import GetDocs from './components/Home/GetDocs';
// import UserComponent from './components/Home/GetTest';
import LoginForm from './components/Forms/Login';
// import BlogForm from './components/Home/PostBlog';
// import SignUpForm from './components/Home/Test';
// import Test from './components/Home/Test';
import {createBrowserRouter,RouterProvider, createRoutesFromElements,Routes,Route}from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Protected from './components/Protected/Protected';
import AddBlog from './components/Blog/AddBlog';
// import { Account } from 'appwrite';
import Profile from './components/Account/Profile';
import Signup from './components/Forms/Signup';
import UserComponent from './components/Home/GetTest';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import ProfileId from './components/Account/ProfileId';
// import { Component } from 'react';


function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Navigation/>}>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/blog' element={<AddBlog/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/account' element={<Profile/>}></Route>
      <Route path='/profile/:id' element={<ProfileId/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='/log' element={<UserComponent/>}></Route>
      <Route path='/dog' element={<GetDocs/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}>
        <Routes path='/' element={<Navigation/>}></Routes>
      </RouterProvider>
    </div>
  );
}

export default App;
