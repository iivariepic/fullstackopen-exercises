import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";
import blogService from "./services/blogs";
import Notification from "./components/Notification.jsx";
import NewBlog from "./components/NewBlog.jsx";
import UserList from "./components/UserList.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userListReducer";
import { setUser } from './reducers/userReducer'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import IndividualUser from "./components/IndividualUser";
import IndividualBlog from "./components/IndividualBlog";
import NavBar from "./components/NavBar.jsx";

const PageLayout = ({ children }) => (
  <RequireLogin>
    <NavBar/>
    <Notification/>
    {children}
  </RequireLogin>
);

const RequireLogin = ({ children }) => {
  const user = useSelector(state => state.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}

const App = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
    setLoadingUser(false)
  }, [dispatch]);

  useEffect(() => {
    if (!loadingUser) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, loadingUser])

  if (loadingUser) return null

  return (
    <div>
      <Routes>
        {/* User List */}
        <Route path="/users" element={
          <PageLayout>
            <UserList/>
          </PageLayout>
        }/>

        {/* Individual User */}
        <Route path="/users/:id" element={
          <PageLayout>
            <IndividualUser/>
          </PageLayout>
        }/>

        {/* Blog List */}
        <Route path="/"
               element={
         <PageLayout>
           <BlogList/>
         </PageLayout>
        }
        />

        {/* Individual Blog */}
        <Route path="/blogs/:id" element={
          <PageLayout>
            <IndividualBlog/>
          </PageLayout>
        }/>

        {/* Create Blog */}
        <Route path="/create" element={
         <PageLayout>
           <NewBlog/>
         </PageLayout>
       }/>

        {/* Login */}
        <Route path="/login" element={<div><NavBar/><h2>Login</h2><Notification/><LoginForm/></div>}/>
      </Routes>
    </div>
  );
};

export default App;
