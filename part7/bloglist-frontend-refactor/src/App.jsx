import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";
import blogService from "./services/blogs";
import UserInfo from "./components/UserInfo.jsx";
import Notification from "./components/Notification.jsx";
import NewBlog from "./components/NewBlog.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from './reducers/userReducer'

const App = () => {
  const [newBlogVisible, setNewBlogVisible] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const PageLayout = ({ children }) => (
    <div>
      <Notification/>
      <h2>blogs</h2>
      {children}
    </div>
  );

  if (user === null) {
    return (
      <div>
        <PageLayout>
          <LoginForm/>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default App;
