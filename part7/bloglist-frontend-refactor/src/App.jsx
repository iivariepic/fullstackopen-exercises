import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";
import blogService from "./services/blogs";
import UserInfo from "./components/UserInfo.jsx";
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

const PageLayout = ({ children }) => (
  <div>
    <Notification/>
    <h2>blogs</h2>
    {children}
  </div>
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
  const [newBlogVisible, setNewBlogVisible] = useState(false);
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
          <RequireLogin>
            <PageLayout>
              <UserInfo/>
              <UserList/>
            </PageLayout>
          </RequireLogin>
        }/>

        {/* Individual User */}
        <Route path="/users/:id" element={
          <RequireLogin>
            <PageLayout>
              <UserInfo/>
              <IndividualUser/>
            </PageLayout>
          </RequireLogin>
        }/>

        {/* Blog List */}
        <Route path="/"
               element={
          <RequireLogin>
           <PageLayout>
             <UserInfo/>
             <br />
             {newBlogVisible ? (
               <NewBlog
                 setNewBlogVisible={setNewBlogVisible}
               />
             ) : (
               <div>
                 <button
                   data-testid="new-blog"
                   onClick={() => setNewBlogVisible(true)}
                 >
                   {" "}new blog{" "}
                 </button>
                 <BlogList/>
               </div>
             )}
           </PageLayout>
          </RequireLogin>
        }
        />

        {/* Individual Blog */}
        <Route path="/blogs/:id" element={
          <RequireLogin>
            <PageLayout>
              <UserInfo/>
              <IndividualBlog/>
            </PageLayout>
          </RequireLogin>
        }/>

        {/* Login */}
        <Route path="/login"
               element={<PageLayout>
                 <LoginForm/>
               </PageLayout>}
        />
      </Routes>
    </div>
  );
};

export default App;
